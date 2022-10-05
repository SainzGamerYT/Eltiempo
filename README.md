#  EL TIEMPO -PRUEBATECNICA
Este proyecto trata sobre recrear la app del tiempo típica en todos los dispositivos. Mediante la cual tu le dices un nombre de una ciudad y te ubica, dandote los datos necesarios para mostrar diariamente o en una tabla de 5 dias en temporalidad de cada 3h. Las tecnologias principales usadas son JavaScript,Html y Css.


# Versiones
 Esta es la version 1.0 de mi app sobre el tiempo.
 Para poder ejecutarse correctamente depende de las siguientes tecnologias en sus versiones:
 - HTML: version 5.0.
 - JQUERY: version 3.3.1. (Se adjuntan las librerias al proyecto para que pueda funcionar sin depender de que este almacenada en otro sitio)
 - JAVASCRIPT: version 1.7.
 - CSS: version 4.
 #### Links a tecnologias usadas
 
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
 
 ## **CARPETA JQUERY**<br>!
 [image](https://user-images.githubusercontent.com/57813147/194130005-b73c52d3-c6f2-4d79-8dd2-2ba726905c0d.png)<br>

 Contiene la libreria necesaria para que funcione la parte de JQuery. Va enlazado al index.html en las primeras lineas
 
 ## **CARPETA JS**<br>![image](https://user-images.githubusercontent.com/57813147/194130031-cd7d9b5c-d585-4aab-8d28-e1fce04c817c.png)<br>

 Esta incluye dos archivos, el principal (index.js) y uno que se llama lugar.js que es el que da la forma a los datos que se guardan mas tarde en el LocalStoragel.
 
 ![foto de cabecera](https://i.imgur.com/fXWYoAI.jpeg)
 
 
 
 

 
 
