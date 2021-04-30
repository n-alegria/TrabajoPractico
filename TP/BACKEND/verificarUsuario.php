<?php
session_start();
require_once("./validarSesion.php");

$dni = $_POST["txtDni"];
$apellido = ucfirst($_POST["txtApellido"]);
$existeUsuario = false;
$path = "./archivos/empleados.txt";

$archivo = fopen($path, "r");

while(!feof($archivo)){
    $unEmpleado = trim(fgets($archivo));
    if(strlen($unEmpleado) > 0){
        $empleadoAux = explode(" - ", $unEmpleado);
        if($empleadoAux[0] == $dni && $empleadoAux[2] == $apellido){
            $existeUsuario = true;
            $_SESSION["DNIEmpleado"] = $dni;
            $_SESSION["nombre"] = $empleadoAux[1];
            $_SESSION["apellido"] = $empleadoAux[2];
            header("Location: ./home.php");
        }
    }
}
fclose($archivo);

if(!$existeUsuario){
    echo "<div style='display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;'>";
    echo "<div style='text-align: center;
    border: 1px solid black;
    padding: 50px;
    font-size: 35px;
    background-color: lightblue;'>";
    echo "<p>Usuario y/o contraseñas incorrectos</p>";
    echo "<a href='../FRONTEND/login.html'>Login</a>";
    echo "</div>";
    echo "</div>";
}

?>