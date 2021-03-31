<?php

require_once("empleado.php");

$path = "./archivos/empleados.txt";
$modo = "r";

$archivo = fopen($path, $modo);

echo "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Mostrar Empleados</title>
</head>
<body>
<h2>Mostrar</h2>
<table align=\"center\">
    <tr><td>Listado de empleados</td></tr>
    <tr><td colspan='10'><hr></td></tr>
";

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
echo "<tr><td align=right><a href=\"../FRONTEND/index.html\">Alta Empleado</a></td></tr>";

echo "
</table>
</body>
</html>";