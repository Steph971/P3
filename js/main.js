jQuery(document).ready(function ($) {

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // custom code

});

//Défilement automatique

var diapo = 0;
changeImages();

function changeImages() {
   var slides = document.getElementsByClassName("img");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  diapo++;
   if (diapo > slides.length){
    diapo = 1
   } 
  slides[diapo-1].style.display = "block"; 
  timeImages = setTimeout(changeImages, 5000);
};


// changer les images au clic de la souris
$(document).ready(function(){
    

 var $img = $('#image .img'), // on cible les images contenues dans le carrousel
    indexImg = $img.length - 1, // on définit l'index du dernier élément
    i = 0, // on initialise un compteur
    $currentImg = $img.eq(i); //on cible l'image affichée, qui possède l'index i 


    function nextImages(){
      i++; // on incrémente
      if( i <= indexImg ){
        $img.css('display', 'none'); // on cache les images
        $currentImg = $img.eq(i); // on définit la nouvelle image
        $currentImg.css('display', 'block'); // puis on l'affiche
    }
    else{
        i = indexImg;
    }
  }
$('#next').click(function(){
  nextImages();

});

function prevImages(){
  i--; 
    if( i >= 0 ){
        $img.css('display', 'none');
        $currentImg = $img.eq(i);
        $currentImg.css('display', 'block');
    }
    else{
        i = 0;
    }
  }

$('#prev').click(function(){ // image précédente

    prevImages();
});

//changer les images avec le clavier
$(document).keydown(function (event) {
  // handle cursor keys
  if (event.key === 'ArrowLeft') {

    prevImages();

  } else if (event.key === 'ArrowRight') {

    nextImages();

  }
});


//pause et play
$( "#pause" ).click(function() {//
    clearTimeout (timeImages);

    $("#pause").hide();
    $('#play').show();//

});

$("#play").click(function(){
  timeImages = setTimeout(changeImages, 5000);

  $('#play').hide();
  $('#pause').show();
});

 });

//Cartographie
      
      var mymap = L.map('mapid').setView([45.750000, 4.850000], 13);
     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3RlcGg5NzEiLCJhIjoiY2p3NndzZGd3MDN6NjQ0bGRzanFoZjVyaSJ9.gN1bSZi2cksxOfsaNHyEHg'
}).addTo(mymap);
     var marker = L.marker([45.750000, 4.850000]).addTo(mymap).bindPopup('<h5>Lyon</h5>');

     ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=125ce86171df55c4dfafaa59fe567dc27e8ba8b5", 
      function(reponse){
        markers = JSON.parse(reponse);
        
        var markerClusters = new L.markerClusterGroup();
        for (let i = 0; i < markers.length; i++) {

          var lat = markers[i].position.latitude;
          var lon = markers[i].position.longitude;
          var popupText = markers[i].name;
          var status = markers[i].status;
          var nbrVelos = markers[i].totalStands.availabilities.bikes;
          console.log(popupText,status, nbrVelos);
          
          var markerLocation = L.marker (new L.LatLng(lat, lon))
 
          markerClusters.addLayer(markerLocation);
          markerLocation.bindPopup(popupText, status, nbrVelos);    
          }
          mymap.addLayer(markerClusters);
});
     document.

     




