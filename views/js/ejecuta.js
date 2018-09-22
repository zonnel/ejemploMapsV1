  var map;
      function initMap() {
        llenarselectmunicipios();
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 17.5308912, lng: -97.2221434},
          zoom: 9
        });

//17.5308912,-97.2221434
        /*var marker = new google.maps.Marker({
         position: {lat: 43.542194, lng: -5.676875},
         map: map,
	  	 title: 'Acuario de Gijón'
        });*/

        var municipio = document.getElementById('municipio');
        var nivel = document.getElementById('nivel');
		municipio.addEventListener('change',
  		function(){
    		var munSelect = this.options[municipio.selectedIndex];
    		var nivSelect = nivel.options[nivel.selectedIndex];
    		console.log(munSelect.value + ': ' + munSelect.text);
    		console.log(nivSelect.value+' : '+ nivSelect.text);


        buscarLugares();
    	  		});


		nivel.addEventListener('change',
			function(){
				var nivSelect = this.options[nivel.selectedIndex];
    			var munSelect = municipio.options[municipio.selectedIndex];
    			console.log(munSelect.value + ': ' + munSelect.text);
    			console.log(nivSelect.value+' : '+ nivSelect.text);

          buscarLugares();
			});

      }


 
   function llenarselectmunicipios(){
      var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/municipios", false);
    req.send(null);
    var mun=JSON.parse(req.responseText)
    var selector=document.getElementById("municipio")

    for(var i = 0; i < mun.length; i++){
      selector.options[i]= new Option(mun[i].nom_municipio,mun[i].nom_municipio)
    }        
    console.log(req.responseText);
   }   


   function buscarLugares(){
    var req = new XMLHttpRequest();
    var mun= document.getElementById('municipio').value;
    var tipo=document.getElementById('nivel').selectedIndex;

    var url="http://localhost:3000/municipios/"+mun;
    console.log(url);
    req.open("GET",url,false);
    req.send(null);

    var datos=JSON.parse(req.responseText);
    for(var i=0;i<datos.length;i++){
      
        var myLatLng = new google.maps.LatLng(datos[i].INMUEBLE_LATITUD,datos[i].INMUEBLE_LONGITUD);
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: datos[i].C_NOMBRE


        });

        //map.addMarker(marker);
       marker.setMap(map);
    }
    console.log(req.responseText);
   }



