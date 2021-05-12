<?php

date_default_timezone_set('America/Argentina/Buenos_Aires');
$fechaActual = date("F j, Y, g:i a") . "\n";
$archivo = fopen('login.txt', 'a');
fwrite($archivo, $fechaActual);
fclose($archivo);

?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Trabajo Practico</title>
    <style>
    body{
        background-color: lightseagreen;
    }
    h1{
        text-align: center;
    }
    div.center{
        display: flex;
        justify-content: space-around;
        width: 70%;
        padding-top: 50px;
        margin: 0 auto;
    }
    button{
        padding: 50px 100px;
        font-size: 30px;
        font-weight: bold;
    }
    div.titulos{
        display: block;
        width: 30%;
        border: 2px solid black;
        text-align: center;
        margin: 0 auto;
        font-size: 22px;
    }
    </style>
</head>
<body>
    <div class="titulos">
        <h1>Alegria Nestor</h1>
        <h2>Legajo: 107211</h2>
    </div>
    <h1>Seleccione con que metodo desea trabajar</h1>
    <div class="center">
        <button type="button" onclick="(window.location.href='./frontend/loginArchivo.html')">Archivos</button>
        <button type="button" onclick="(window.location.href='./frontend/loginBD.html')">Bases de Datos</button>
    </div>
</body>
</html>