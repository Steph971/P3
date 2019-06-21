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
  setTimeout(changeImages, 5000);
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
  alert('ca marche');
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


$( "#pause" ).click(function() {

  $( ".block" ).animate({ left: "+=100px" }, 2000 );

});

 });

// Stop animation avec le bouton pause

$( "#stop" ).click(function() {

  $( ".block" ).stop();

});

//Cartographie
      // latitude, longitude pour Paris
      var lat = 48.852969;
      var lon = 2.349903;
      var macarte = null;
      // Fonction d'initialisation de la carte
      function initMap() {
        // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                macarte = L.map('map').setView([lat, lon], 11);
                // Leaflet ne récupère pas les cartes 
                L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    //  lien vers la source des données
                    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                    minZoom: 1,
                    maxZoom: 20
                }).addTo(macarte);
            }
      window.onload = function(){
        // Fonction d'initialisation 
        initMap(); 
      };
 






$('#playButton').click(function () {
                        $('#myCarousel').carousel('cycle');
                    });