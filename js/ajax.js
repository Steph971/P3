function ajaxGet(url, callback){
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status <400){
			// Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
		} else{
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
req.send(null);
}