<?php

require_once("./Clases/empleado.php");

$path = "./archivos/empleados.txt";
$archivo = fopen($path, "r");

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>HTML 5 - Listado de Empleados</title>
</head>
<body>
<h2>Listado de Empleados</h2>
<table align="center">
    <tr>
        <td>
            <h4>Info</h4>
        </td>
    </tr>
    <tr>
        <td colspan='2'>
            <hr>
        </td>
    </tr>

 <?php
while(!feof($archivo)){
    // 'trim()' -> elimina espacios en blanco al inicio y final de la cadena
    $unEmpleado = trim(fgets($archivo));
    // Si lo que obtengo con 'fgets()' es mayor a cero...
    if(strlen($unEmpleado) > 0){
        // Con 'explode()' divido una cadena de acuerdo a un seaprador pasado por parametro, retorna un array
        $arrayEmpleado = explode(" - ", $unEmpleado);
        $nuevoEmpleado = new Empleado($arrayEmpleado[0], $arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[3],$arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
        echo "<tr><td>".$nuevoEmpleado->ToString()."</td>";
        echo "<td><a href='eliminar.php?legajo=" . $nuevoEmpleado->GetLegajo() . "'>Eliminar</a></td></tr>";
    }
}
fclose($archivo);
echo "<tr><td colspan='2'><hr></td></tr>";
echo "<tr><td><a href=\"../FRONTEND/index.html\">Alta Empleado</a></td></tr>";

?>

</table>
</body>
</html>