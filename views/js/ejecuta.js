  var map;
  var marcadores=[];
  var informacion=[]

      function initMap() {
        llenarselectmunicipios();
        llenarSelectTipo();
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 17.5308912, lng: -97.2221434},
          zoom: 9
        });

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
    console.log("selector municipios agregado correctamente");
   }   

   function llenarSelectTipo(){
    var req= new XMLHttpRequest();
    var selector=document.getElementById("nivel");
    req.open("GET","http://localhost:3000/tipos",false);
    req.send(null);
    var tip=JSON.parse(req.responseText)
    for(var i =1 ; i< tip.length+1; i++){
        selector.options[i]= new Option(tip[i-1].nom_tipo, tip[i-1].nom_tipo)
    }

    console.log("datos selector tipo agregados");
   }

   var colortipo=['#00f','#f00','#ffe333', '#9fff33','#33ffc7', '#33acff' , '#3349ff',
    '#b533ff' , '#fc33ff' , '#ff3333' , '#bbb5b5' , '#318b22' , '#efecbf' , '#5d6d7e'
, '#2e86c1' , '#d7bde2' , '#f2d7d5' , '#d0d3d4'];

   function buscarColor(tipodat){
     if (tipodat=="BIBLIOTECA") {return colortipo[0];
    }else if (tipodat=="SUPERVISION DE ZONA DE EDUCACION") {return colortipo[1];
    }else if (tipodat == "JEFATURA DE SECTOR"){return colortipo[2];
    }else if (tipodat == "SERVICIO REGIONAL") {return colortipo[3];
    }else if (tipodat == "COORDINACION DE ZONA DE EDUCACION FISICA"){return colortipo[4];
    }else if (tipodat == "ALMACEN DE LIBROS GRATUITOS"){return colortipo[5];
    }else if (tipodat == "ADMINISTRATIVO"){return colortipo[6];
    }else if (tipodat == "APOYO A LA EDUCACION"){return colortipo[7];
    }else if (tipodat == "CENTRO CULTURAL"){return colortipo[8];
    }else if (tipodat == "ESCUELA"){return colortipo[9];
    }else if (tipodat == "DESARROLLO COMUNITARIO"){return colortipo[10];
    }else if (tipodat == "CENTRO DE INVESTIGACION"){return colortipo[11];
    }else if (tipodat == "RECTORIA"){return colortipo[12];
    }else if (tipodat == "ASISTENCIAL"){return colortipo[13];
    }else if (tipodat == "BOLSA (EN LIQUIDACION)") {return colortipo[14];
    }else if (tipodat ==  "CENTRO DE MAESTROS"){return colortipo[15];
    }else if (tipodat == "PLANTEL (MEDIA SUPERIOR)"){return colortipo[16]
    }

   }
var infowindow;
   function buscarLugares(){
   // marker.setMap(null);
   eliminarMarcadores();

    var req = new XMLHttpRequest();
    var mun= document.getElementById('municipio').value;
    var tipo=document.getElementById('nivel').value;
    //var infoWindow = new google.maps.InfoWindow;
     
    if(tipo=="all"){
         var url="http://localhost:3000/municipios/"+mun;
          //console.log(url);
          req.open("GET",url,false);
          req.send(null);

          var datos=JSON.parse(req.responseText);
          for(var i=0;i<datos.length;i++){
            //agregando mensaje
            var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = datos[i].C_NOMBRE;
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = datos[i].INMUEBLE_C_VIALIDAD_PRINCIPAL;
              infowincontent.appendChild(text);
              informacion.push(infowincontent);
              //console.log(text);
            
          var col= buscarColor(datos[i].C_TIPO);
          var myLatLng = new google.maps.LatLng(datos[i].INMUEBLE_LATITUD,datos[i].INMUEBLE_LONGITUD);
         var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: datos[i].C_NOMBRE,
           icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 10, //tamaño
          strokeColor:  '#17202a' , //color del borde
          strokeWeight: 2, //grosor del borde
          fillColor: col, //color de relleno
          fillOpacity:1// opacidad del relleno
        }});
         marcadores.push(marker);

         (function(i, marker) {
          google.maps.event.addListener(marker,'click',function() {
           if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
          } 
          infowindow.setContent(informacion[i]);
          infowindow.open(map, marker);
          });
          })(i, marker);
      }
      }else{
        var url="http://localhost:3000/municipio/"+mun+"/"+tipo;
        console.log(url);
        req.open("GET",url,false);
        req.send(null);

        var datos=JSON.parse(req.responseText);
        for(var i=0;i<datos.length;i++){
          var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = datos[i].C_NOMBRE;
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = datos[i].INMUEBLE_C_VIALIDAD_PRINCIPAL;
              infowincontent.appendChild(text);
              informacion.push(infowincontent);

          var myLatLng = new google.maps.LatLng(datos[i].INMUEBLE_LATITUD,datos[i].INMUEBLE_LONGITUD);
          var col= buscarColor(tipo);
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: datos[i].C_NOMBRE,
            icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 10, //tamaño
            strokeColor:  '#17202a' , //color del borde
            strokeWeight: 2, //grosor del borde
            fillColor: col, //color de relleno
            fillOpacity:1// opacidad del relleno
        }

          });
              marcadores.push(marker);
          (function(i, marker) {
          google.maps.event.addListener(marker,'click',function() {
           if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
          } 
          infowindow.setContent(informacion[i]);
          infowindow.open(map, marker);
          });
          })(i, marker);
        }
      }

      //agregarinformacion();
   }


   function eliminarMarcadores(){
     for(var i =0;i<marcadores.length;i++){
      marcadores[i].setMap(null);
      informacion=null;
     }
     marcadores = [];
     informacion=[];
   }

