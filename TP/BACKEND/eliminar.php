<?php

require_once("./validarSesion.php");   
require_once("./Clases/fabrica.php");

$legajo = $_GET['legajo'];

var_dump($legajo);

$bandera = false;

$archivo = fopen("./archivos/empleados.txt",'r');

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

if($bandera){
    $empleado = new Empleado($arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[0], $arrayEmpleado[3], $arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
    $empleado->SetPathFoto($arrayEmpleado[7]);
    $fabrica = new Fabrica("Cosan", 7);
    $fabrica->TraerDeArchivo("./archivos/empleados.txt");
    if($fabrica->EliminarEmpleado($empleado)){
        unlink($empleado->GetPathFoto());
        $fabrica->GuardarEnArchivo("./archivos/empleados.txt");
        echo "Se elimino con exito el empleado";
    }
    else{
        echo "No se pudo eliminar al empleado";
    }
}
else{
    echo "No hay empleado con el legajo ingresado.";
}

?>