<?php

require_once "./Clases/fabrica.php";

$legajo = $_GET["legajo"];

$path = "./archivos/empleados.txt";
$modo = "r+";
$bandera = false;

$archivo = fopen($path, $modo);

while(!feof($archivo)){
    $unEmpleado = trim(fgets($archivo));
    if(strlen($unEmpleado) > 0){
        $arrayEmpleado = explode(" - ", $unEmpleado);
        if($legajo == $arrayEmpleado[4]){
            $bandera = true;
            break;
        }
    }
}
fclose($archivo);

echo "<!DOCTYPE html>
<html lang=\"es\">
<head>
    <meta charset=\"UTF-8\">
    <title>Eliminar</title>
</head>
<body>";

if($bandera){
    $empleado = new Empleado($arrayEmpleado[0], $arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[3], $arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
    $fabrica = new Fabrica("Cosan", 7);
    $fabrica->TraerDeArchivo($path);
    if($fabrica->EliminarEmpleado($empleado)){
        $fabrica->GuardarEnArchivo($path);
        echo "<b>Se elimino con exito el empleado</b><br/>";
    }
    else{
        echo "<b>No se pudo eliminar al empleado</b><br/>";
    }
}
else{
    echo "<b>No hay empleado con el legajo ingresado.</b><br/><br/>";
}

echo "<a href=\"./mostrar.php\">Mostrar</a><br/>";
echo "<a href=\"../FRONTEND/index.html\">Alta empleado</a>";

echo "
</body>
</html>
";
?>