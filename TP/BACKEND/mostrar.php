<?php

require_once("./Clases/empleado.php");
require_once("./validarSesion.php");

$path = "./archivos/empleados.txt";
$archivo = fopen($path, "r");


echo "<!DOCTYPE html>
<html lang=\"es\">
<head>
    <meta charset=\"UTF-8\">
    <script src='../FRONTEND/javascript/funciones.js'></script>
    <title>HTML 5 - Listado de Empleados</title>
</head>
<body>
<h2>Listado de Empleados</h2>
<form action='./index.php' method='POST' id='formModificar'>
<input type='hidden' value='Modificar' id='hiddenModificar' name='hiddenModificar'/>
</form>
<table align=\"center\">
    <tr>
        <td>
            <h4>Info</h4>
        </td>
    </tr>
    <tr>
        <td colspan='10'>
            <hr>
        </td>
    </tr>";


while(!feof($archivo)){
    // 'trim()' -> elimina espacios en blanco al inicio y final de la cadena
    $unEmpleado = trim(fgets($archivo));
    // Si lo que obtengo con 'fgets()' es mayor a cero...
    if(strlen($unEmpleado) > 0){
        // Con 'explode()' divido una cadena de acuerdo a un seaprador pasado por parametro, retorna un array
        $arrayEmpleado = explode(" - ", $unEmpleado);
        $nuevoEmpleado = new Empleado($arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[0], $arrayEmpleado[3],$arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
        $nuevoEmpleado->SetPathFoto($arrayEmpleado[7]);
        echo "<tr><td>".$nuevoEmpleado->ToString()."</td>";
        echo "<td><img src='" . $nuevoEmpleado->GetPathFoto() . "' style='width:90px;height:90px;'></td> ";
        echo "<td><a href='eliminar.php?legajo=" . $nuevoEmpleado->GetLegajo() . "'>Eliminar</a></td>";
        echo "<td><input type='button' value='Modificar' onClick='AdministrarModificar(".$nuevoEmpleado->GetDni().")' /></td></tr>";
        
    }
}
fclose($archivo);
// echo "<tr><td colspan='10'><hr></td></tr>";
// echo "<tr><td><a href='../BACKEND/index.php'>Alta Empleado</a></td></tr>";
// echo "<tr><td><a href='./cerrarSesion.php'>Cerrar Sesion</a></td></tr>";

echo "</table>
</body>
</html>";
?>