<?php
session_start();

$dni = $_POST["txtDni"];
$apellido = $_POST["txtApellido"];
$existeUsuario = false;
$path = "./archivos/empleados.txt";

$archivo = fopen($path, "r");

while(!feof($archivo)){
    $unEmpleado = trim(fgets($archivo));
    if(strlen($unEmpleado) > 0){
        $empleadoAux = explode(" - ", $unEmpleado);
        if($empleadoAux[1] == $apellido && $empleadoAux[2] == $dni){
            $existeUsuario = true;
            $_SESSION["DNIEmpleado"] = $dni;
            header("Location: ./mostrar.php");
        }
    }
}
fclose($archivo);

if(!$existeUsuario){
    echo "No existe el empleado.<br/>";
    echo "<a href='../FRONTEND/login.html'>Login</a>";
}


?>