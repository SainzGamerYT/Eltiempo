var ciudadesGuardadas = new Array();
var apikey = "14b2f94da8d9c4432f08fede52ad5f52";

/*PARTE DE LLAMADAS AL SERVIDOR*/

//FUNCION QUE AL INTRODUCIR UN NOMBRE, BUSCA LA CIUDAD A LA QUE TE PUEDES ESTAR REFIRIENDO Y SACA SU LONGITUD Y LATITUD NECESARIAS PARA HACER
//LLAMADAS POSTERIORES Y PODER CONSULTAR EL TIEMPO EN UNA LATITUD Y LONGITUD DETERMINADA
function ejecutarLlamadaUbicacion() {

    var request = new XMLHttpRequest();
    var ciudad = document.querySelector("#lugar").value;
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var datos = request.responseText;
                var jsonDatos = JSON.parse(datos);
                ejecutarLlamadaTiempo(jsonDatos);
                ejecutarLlamadaTiempo3h(jsonDatos)
            } else {
                alert("Nombre no encontrado, busque de nuevo")
            }
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET", "https://api.openweathermap.org/geo/1.0/direct?q=" + ciudad + "&limit=1&appid=" + apikey, true);

    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();
}
//FUNCION QUE SABIENDO LA LATITUD Y LA LONGITUD EXACTA DEL LUGAR LO QUE HACE ES RECOGER LOS DATOS CORRESPONDIENTES A LA TEMPORAIDAD DE 1DIA POR UNA PETICION
function ejecutarLlamadaTiempo(datos) {
    var lat;
    var lon;
    datos.forEach(element => {
        lat = element.lat;
        lon = element.lon;

    });
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var datos = request.responseText;
                var jsonDatos = JSON.parse(datos);
                pintarHtml1(jsonDatos, lon, lat);
            } else {
                alert("Error al cargar o Nombre no encontrado, busque de nuevo")
            }
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apikey, true);
    //POR 3h request.open("GET", "https://api.openweathermap.org/data/2.5/forecast?&lang=es&units=metric&lat="+lat+"&lon="+lon+"&appid="+apikey, true);
    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();


}
//FUNCION QUE SABIENDO LA LATITUD Y LA LONGITUD EXACTA DEL LUGAR LO QUE HACE ES RECOGER LOS DATOS CORRESPONDIENTES A LA TEMPORAIDAD DE 5 DIAS POR PERIODOS DE 3H POR UNA PETICION
function ejecutarLlamadaTiempo3h(datos) {
    var lat;
    var lon;
    datos.forEach(element => {
        lat = element.lat;
        lon = element.lon;

    });

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var datos = request.responseText;
                var jsonDatos = JSON.parse(datos);
                pintarHtml2(jsonDatos);
            } else {
                alert("No se ha podido cargar los datos correspondientes a los proximos 5 dias o no se ha encontrado la ciudad");
            }
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET", "https://api.openweathermap.org/data/2.5/forecast?&lang=es&units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apikey, true);
    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();


}

/*PARTE DE PINTAR HTML EN PANTALLA*/


//PINTA LOS DATOS DE EJECUTARLLAMADATIEMPO() QUE SON LOS CORRESPONDIENTES A 1DIA
function pintarHtml1(datos, lon, lat) {
    $("#botonborrar").remove();

    var codigo = datos.sys.country;
    var imagen;
    datos.weather.forEach(element => {
        imagen = element.icon;
    });
    var iconurl = "https://openweathermap.org/img/w/" + imagen + ".png";
    var nombre = datos.name;
    var tem_max = datos.main.temp;
    var tem_min = datos.main.temp_min;
    var humedad = datos.main.humidity;
    console.log(" TEST: Ciudad: ", nombre, "Temperatura maxima: ", tem_max, "Temperatura minima: ", tem_min, "Humedad: " + humedad + "%", "COD: " + codigo)
    $("#contenedorgrande").html("");
    $("#contenedorgrande").append('<div align="center" class="divcordenadas" lat="' + lat + '" lon="' + lon + '" ><h1 class="nombreciudad">' + nombre +
        '<img class="bandera" src="https://countryflagsapi.com/png/' + codigo + '" "></h1> <img class="imggrande" src="'
        + iconurl + '" alt=""><h3>Temp: ' + Math.trunc(tem_max) + 'º/' + Math.trunc(tem_min) + 'º<br>  Humedad: ' + humedad +
        '% </h3><h4 class="hacedeboton"><img class="cora2" src="img/cora2.png" alt=""></h4></div>');

    $(".cora2").click(function () {
        //ANIMACION PARA QUE SE VEA BONITO
        $(this).animate({
            "opacity": "0.2"
        }, 700);
        $(this).animate({
            "opacity": "1"
        }, 900);
        $(".cora2").remove();


        guardarLocalStorage(lat, lon, nombre, Math.trunc(tem_max), Math.trunc(tem_min), humedad, codigo);


    });
    $(".hacedeboton").click(function () {
        //COMPRUEBA QUUE SE HAYA AÑADIDO EL CORAZON PARA NO VOLVER A AÑADIR UNA MISMA CIUDAD
        if ($(this).children(".cora").length > 0) {
            alert("Ya has guardado este Lugar");
        } else {
            $(this).append('<img class="cora" src="img/cora.png" alt="">');
        }
    });
}
//PINTA LOS DATOS DE EJECUTARLLAMADATIEMPO3H() QUE SON LOS CORRESPONDIENTES A 5DIA Y ESTA EN LA PARTE POSTERIOR
function pintarHtml2(datos) {
    $("#contenedorpequeño").html("");
    $("#contenedorpequeño").append('<table class="mitabla" align="center" id="contenidos"><td>Dia</td><td>Hora</td><td>Temperatura</td><td>Humedad</td><td>Nubes</td></table>');
    datos.list.forEach(element => {
        var dt = element.dt_txt;
        var tem_max = element.main.temp_max;
        var tem_min = element.main.temp_min
        var humedad = element.main.humidity;
        element.weather.forEach(element => {
            var icono = element.icon;
            var iconurl = "https://openweathermap.org/img/w/" + icono + ".png";
            $("#contenidos").append('<tr> <td>' + dt.substring(8, 10) + '</td> <td>' + dt.substring(11, 16) + '</td><td>' + Math.trunc(tem_max) + "º/" + Math.trunc(tem_min) + 'º</td><td>' + humedad + '%</td><td><img class="imgpequena"src="' + iconurl + '" alt=""></td></tr>');
        });
    });
}

/*PARTE DE ALMACENAR EN LOCALSTORAGE*/


//COMPRUEBA LO GUARDADO EN EL LOCALSTORAGE Y LO RECOGE PARA SEGUIR AÑADIENDO MAS DATOS
function guardarLocalStorage(lat, lon, nombre, tem_max, tem_min, humedad, codigo) {
    if (localStorage.length > 0) {
        ciudadesGuardadas = JSON.parse(localStorage["ciudades"]);
    }
    ciudadesGuardadas.push(new Lugar(lat, lon, nombre, tem_max, tem_min, humedad, codigo));
    localStorage["ciudades"] = JSON.stringify(ciudadesGuardadas);


}
//FUNCION QUE BORRA EL LOCALSTORAGE Y VACIA TODO
function limpiarLocalStorage() {

    localStorage.clear();
    $("#botonborrar").remove();
    $("#contenedorgrande").html("");
    $("#contenedorgrande").html("");
}

/*PARTE DE GUARDAR EN FAVORITOS*/


//Comprueba el localsotrage donde se guarda las favoritas y añade un boton para eliminar
function funcionFavoritos() {
    $("#botonborrar").remove();
    $("#contenedorgrande").html("");
    $("#contenedorpequeño").html("");


    if (localStorage.length > 0) {
        var ciudades = JSON.parse(localStorage["ciudades"]);
        $("#barraprincipal").append('<td id="botonborrar"><input type="button" class="buscador" id="botonborrar" value="Borrar" onclick="limpiarLocalStorage()"></input><td>');
        for (let i = 0; i < ciudades.length; i++) {
            funcionLlamadaHtmlFavoritos(ciudades[i].lat, ciudades[i].lon, ciudades[i].nombre, ciudades[i].tem_max, ciudades[i].tem_min, ciudades[i].humedad, ciudades[i].codigo);
        }
    } else {
        alert("Aun no has guardado ninguna localizacion.")
        geoIP();
    }

}
//RECOGE DEL STORAGE LA LAT Y LON DE LAS CIUDADES GUARDADAS Y CON ESOS DATOS HACE LAS PETICIONES AL SERVIDOR DE UNA EN UNA
function funcionLlamadaHtmlFavoritos(lat, lon, nombre, tem_max, tem_min, humedad, codigo) {
    var latitud = lat;
    var longitud = lon;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var datos = request.responseText;
                var jsonDatos = JSON.parse(datos);
                funcionPintarHtmlFavoritos(jsonDatos, lon, lat);
            } else {
                alert("No tiene conexion a internet, se mostrara lo guardado");
                funcionPintarHtmlFavoritosSinconexion(lat, lon, nombre, tem_max, tem_min, humedad, codigo);
            }
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=" + latitud + "&lon=" + longitud + "&appid=" + apikey, true);
    //POR 3h request.open("GET", "https://api.openweathermap.org/data/2.5/forecast?&lang=es&units=metric&lat="+lat+"&lon="+lon+"&appid="+apikey, true);
    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();


}
//PINTA POR PANTALLA LAS CIUDADES GUARDADAS EN EL LOCALSTORAGE
function funcionPintarHtmlFavoritos(datos, lon, lat) {
    var codigo = datos.sys.country;
    var imagen;
    datos.weather.forEach(element => {
        imagen = element.icon;
    });
    var iconurl = "https://openweathermap.org/img/w/" + imagen + ".png";
    var nombre = datos.name;
    var tem_max = datos.main.temp;
    var tem_min = datos.main.temp_min;
    var humedad = datos.main.humidity;

    $("#contenedorgrande").append('<div class="divcordenadas" lat="' + lat + '" lon="' + lon + '" ><br> <h1 class="nombreciudad">' + nombre
        + '<img class="bandera" src="https://countryflagsapi.com/png/' + codigo + '" "></h1> <img class="imagengrandefav" src="'
        + iconurl + '" alt=""><h3>Temp: ' + Math.trunc(tem_max) + 'º/' + Math.trunc(tem_min) + 'º <br>  Humedad: ' + humedad
        + '% </h3></div>');


}
//PINTA POR PANTALLA LAS CIUDADES GUARDADAS EN EL LOCALSTORAGE CUANDO NO HAY INTERNET
function funcionPintarHtmlFavoritosSinconexion(lat, lon, nombre, tem_max, tem_min, humedad, codigo) {

    var nombre = nombre;
    var tem_max = tem_max;
    var tem_min = tem_min;
    var humedad = humedad;
    var codigo = codigo;
    $("#contenedorgrande").append('<div class="divcordenadas" align="center" lat="' + lat + '" lon="' + lon + '" ><h1 class="nombreciudad">' + nombre
        + '</h1><h2> ' + codigo + '</h2> <img class="imagengrandefav" src="'
        + '" alt=""><h3>Temp: ' + Math.trunc(tem_max) + 'º/' + Math.trunc(tem_min) + 'º<br>  Humedad: ' + humedad
        + '% </h3></div>');


}


/*FUNCIONALIDADES EXTRA*/
// Para no tener la pagina principal vacia, lo que hace es coger las coord de tu navegador y te imprime por pantalla la ubicacion de donde te encuentres
function geoIP() {
    var Geo = navigator.geolocation || (window.google && google.gears && google.gears.factory.create('beta.geolocation'));
    if (Geo) Geo.getCurrentPosition(pintarHTMLBienvenida, erroresGeo);

}
function erroresGeo(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('Activa permisos de geolocalizacion');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Activa localizacion por GPS o Redes .');
            break;
        default:
            alert('ERROR: ' + error.code);
    }
}
function pintarHTMLBienvenida(posicion) {
    $("#contenedorgrande").append('<div class="saludo"> <h1 class="nombreciudad">Bienvenidos</h1><h2>Ubicacion estimada:' + posicion.coords.latitude + '/' + posicion.coords.longitude + '</h2></div>');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var jsonDatos = request.responseText;
                var datos = JSON.parse(jsonDatos);
                var codigo = datos.sys.country;
                var imagen;
                datos.weather.forEach(element => {
                    imagen = element.icon;
                });
                var iconurl = "https://openweathermap.org/img/w/" + imagen + ".png";
                var nombre = datos.name;
                var tem_max = datos.main.temp;
                var tem_min = datos.main.temp_min;
                var humedad = datos.main.humidity;
                $("#contenedorgrande").append('<div class="divcordenadas" align="center"><h1 class="nombreciudad">' + nombre
                    + '<img class="bandera" src="https://countryflagsapi.com/png/' + codigo + '" "></h1> <img class="imagengrandefav" src="'
                    + iconurl + '" alt=""><h3>Temp: ' + Math.trunc(tem_max) + 'º/' + Math.trunc(tem_min) + 'º<br>  Humedad: ' + humedad
                    + '% </h3></div>');

            } else {
                alert("UBICACION NO PERMITIDA");

            }
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=" + posicion.coords.latitude + "&lon=" + posicion.coords.longitude + "&appid=" + apikey, true);
    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();

}
