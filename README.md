#  EL TIEMPO -PRUEBATECNICA
Este proyecto trata sobre recrear la app del tiempo típica en todos los dispositivos. Mediante la cual tu le dices un nombre de una ciudad y te ubica, dandote los datos necesarios para mostrar diariamente o en una tabla de 5 dias en temporalidad de cada 3h. Las tecnologias principales usadas son JavaScript,Html y Css.
<br>
LINK --> https://sainzgameryt.github.io/Eltiempo/


# Versiones
 Esta es la version 1.0 de mi app sobre el tiempo.
 Para poder ejecutarse correctamente depende de las siguientes tecnologias en sus versiones:
 - HTML: version 5.0.
 - JQUERY: version 3.3.1. (Se adjuntan las librerias al proyecto para que pueda funcionar sin depender de que este almacenada en otro sitio)
 - JAVASCRIPT: version 1.7.
 - CSS: version 4.
 - Api de OpenWeatherMap
 #### Links a tecnologias usadas
 
 - CSS: https://www.w3schools.com/css/
 - JAVASCRIPT: https://www.w3schools.com/js/default.asp
 - HTML: https://www.w3schools.com/html/default.asp
 - Api de OpenWeatherMap: https://openweathermap.org/api
 
 ### Formas de enlazarlo
 Para enlazar las librerias anteriores y los archivos javascript son necesarias las siguientes intruciones en el HTML, en concreto en el index.html
```<script src="js/index.js"></script>```<br>
```<script src="js/Lugar.js"></script>```<br>
```<link rel="stylesheet" href="css/estilo.css">```<br>
```<script src="jquery/jquery-3.3.1.min.js"></script>```

# Composicion
El proyecto cuenta con 4 carpetas y 2 archivos en la raiz. Las carpetas son : css,img,jquey,js. Y los archivos son: index.html y README.md

  ## **CARPETA CSS** <br>
  ![image](https://user-images.githubusercontent.com/57813147/194129672-5fce5b98-3c89-4baf-99c9-0a562b398fea.png)
  <br>
     Contiene el archivo de estilos que esta estructurado en 4 grandes bloques.<br>
      - El primer bloque es lo que afecta a todo en general sin depender del tamaño de la pantalla.<br>
      - El segundo bloque es 1/3 de las posibles coombinaciones del tamaño de la pantalla para el responsive (100px-500px)<br>
        ```@media screen and (min-width: 100px) and (max-width: 500px)```<br>
      - El tercer bloque es 2/3 de las posibles coombinaciones del tamaño de la pantalla para el responsive (500px-1300px)<br>
        ```@media screen and (min-width: 500px) and (max-width: 1300px)```<br>
      - El segundo bloque es 1/3 de las posibles coombinaciones del tamaño de la pantalla (1301px-2500px)<br>
        ```@media screen and (min-width: 1301px) and (max-width: 2500px)```<br><br>
## **CARPETA IMG**<br>
 ![image](https://i.imgur.com/wRJcowi.jpeg) <br>
 Contiene los archivos necesarios, desde fondo de pantalla hasta los iconos de los corazones necesarios para añadir a favoritos las nuevas ciudades. Tambien cuenta con el "sol.ico" que sirve para establecer el icono de la web en el navegador. <br><br>
 
 ## **CARPETA JQUERY**<br>
 ![image](https://user-images.githubusercontent.com/57813147/194130005-b73c52d3-c6f2-4d79-8dd2-2ba726905c0d.png)<br>

 Contiene la libreria necesaria para que funcione la parte de JQuery. Va enlazado al index.html en las primeras lineas
 
 ## **CARPETA JS**<br>
 ![image](https://user-images.githubusercontent.com/57813147/194130031-cd7d9b5c-d585-4aab-8d28-e1fce04c817c.png)<br>
 Esta incluye dos archivos, el principal (index.js) y uno que se llama lugar.js que es el que da la forma a los datos que se guardan mas tarde en el LocalStoragel.
 Yo dividiria en 5 partes el archivo index,js segun su funcionalidad
 
 ![image](https://user-images.githubusercontent.com/57813147/194130693-0052434c-6837-4ae1-955b-21e7ce0b4a8e.png)
 ![c](https://i.imgur.com/X2fasVf.jpeg)
 ![image](https://user-images.githubusercontent.com/57813147/194130938-421095b4-6c3e-4ee9-a9f3-9c1c8ff3fdbc.png)
 ![image](https://user-images.githubusercontent.com/57813147/194130973-bf01f19f-00c9-41bd-bf6e-ceda4adab25e.png)
 ![image](https://user-images.githubusercontent.com/57813147/194131019-296a62c6-c98f-4571-a20a-b1655bbdb251.png)
 
 # FUNCIONALIDAD
 
 - Decodifica segun un nombre la ubicacion y da LOG y LAT.
 - Muestra segun tu localizacion la temperatura en un rango DIARIO
 - Muestra los datos en un rango DIARIO de la ciudad que se pida
 - Muestra los datos en un rango 5 DIAS/3H de la ciudad quee se pida
 - Añade a favoritos las ciudades que quieras
 - Muestra favoritos con temporalidad DIARIA
 - Se puede consultar sin conexion los favoritos ( pero no se ven iconos)
 - Deteccion de bandera segun el pais.
 
 # Problemas detectados durante el desarollo
 He tenido dos problemas a mencionar;
  - Github bloqueaba las llamadas ya que no las consideraba seguras porque la API me daba la forma de peticion http, y fu tan sencillo que cambiar a https las peticiones de los datos.
  - Los datos recogidos del API la temperatura minima no me la da DIARIA si no HORARIA por lo cual he desarollado en funcion a eso, y muchas veces la minima y la maxima coinciden porque dentro de una hora el tiempo no varia mucho.

 # Sintaxis de las peticiones al servidor
 Aqui un pedazo de las llamadas para obtener los datos usadas.
 ``` var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var datos = request.responseText;
                var jsonDatos = JSON.parse(datos);
               funcionquesea2(x);
            } else {
                alert("No tiene conexion a internet, se mostrara lo guardado");
                funcionquesea1(x);
            }
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=" + latitud + "&lon=" + longitud + "&appid=" + apikey, true);
    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();
  ```
 # EXTENSIONES UTILIZADAS EN VISUAL STUDIO CODE
 
 - Live Server v5.7.9 :https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
 ![image](https://user-images.githubusercontent.com/57813147/194202341-d969796c-b9a6-4136-ac47-8d143bfc868f.png)

 - ESLint v2.2.6: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
 ![image](https://user-images.githubusercontent.com/57813147/194202273-6b4391fc-da43-400e-8b2b-95ab701a2a5b.png)
 
 - Error Lens v3.6.0 : https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens
 ![image](https://user-images.githubusercontent.com/57813147/194202423-96b58cd9-2ae6-40f2-b881-278c85190f4f.png)

 
 # APLICACION EN FUNCIONAMIENTO
 ![image](https://user-images.githubusercontent.com/57813147/194134439-488f4420-aa67-4e1c-9f46-1561dfd426a0.png)
 ![image](https://user-images.githubusercontent.com/57813147/194134501-e592c340-c539-4489-9880-26424bd12cbd.png)
 ![image](https://user-images.githubusercontent.com/57813147/194134532-55a2c0e9-29f7-4705-85f3-306bb65009c0.png)
 ![image](https://user-images.githubusercontent.com/57813147/194134611-6e40f7d3-45b2-4e4f-a72d-e5622cbd5709.png)

## Version CSS-Responsive(pequeña)

![image](https://user-images.githubusercontent.com/57813147/194134831-5f1960a5-f8e3-4918-a510-2b36852827ea.png)
![image](https://user-images.githubusercontent.com/57813147/194134875-8035fb0a-6032-463a-bfcf-fc56ae95ac2f.png)
![image](https://user-images.githubusercontent.com/57813147/194134908-b4900a78-63cd-4cd8-a960-30cfa4223371.png)

 
 
 
 
 

 
 
