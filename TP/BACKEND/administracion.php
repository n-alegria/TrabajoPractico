<?php

require_once("fabrica.php");

$dni = $_POST["txtDni"];
$nombre = $_POST["txtNombre"];
$apellido = $_POST["txtApellido"];
$sexo = $_POST["cboSexo"];
$legajo = $_POST["txtLegajo"];
$sueldo = $_POST["txtSueldo"];
$turno = $_POST["rdoTurno"];

$nuevoEmpleado = new Empleado($nombre, $apellido, $dni, $sexo, $legajo, $sueldo, $turno);
$fabrica = new Fabrica("Cosan", 7);

$path = "./archivos/empleados.txt";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Administracion</title>
</head>
<body>

<h2>Administracion</h2>

<?php
$fabrica->TraerDeArchivo($path);
if($fabrica->AgregarEmpleado($nuevoEmpleado)){
    // echo "Prueba:<br\>".$fabrica->ToString();
    $fabrica->GuardarEnArchivo($path);
    echo "<a href=\"./mostrar.php\">Mostrar</a>";
}
else{
    echo "Error al ingresar al empleado<br/>";
    echo "<a href=\"../FRONTEND/index.html\">Pagina Principal</a>";
}
?>
    
</body>
</html>

