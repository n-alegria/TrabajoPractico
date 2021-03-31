<?php

require_once("empleado.php");

$path = "./archivos/empleados.txt";
$modo = "r";

$archivo = fopen($path, $modo);

?>

<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Mostrar Empleados</title>
</head>
<body>
<h2>Mostrar</h2>
<?php

while(!feof($archivo)){
    // 'trim()' -> elimina espacios en blanco al inicio y final de la cadena
    $unEmpleado = trim(fgets($archivo));
    // Si lo que obtengo con 'fgets()' es mayor a cero...
    if(strlen($unEmpleado) > 0){
        // Con 'explode()' divido una cadena de acuerdo a un seaprador pasado por parametro, retorna un array
        $arrayEmpleado = explode(" - ", $unEmpleado);
        $nuevoEmpleado = new Empleado($arrayEmpleado[0], $arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[3],$arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
        echo $nuevoEmpleado->ToString() . "<br/>";
    }
}
fclose($archivo);
echo "<br/>";
echo "<a href=\"../FRONTEND/index.html\">Alta Empleado</a>";

?>
</body>
</html>

