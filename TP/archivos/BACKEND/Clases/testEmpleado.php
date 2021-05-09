<?php

require_once "empleado.php";

echo "--> TEST EMPLEADO <--<br/><br/>";

echo "--> Creo un empleado y muestro sus datos.<br/>";
$empleadoTest = new Empleado("Lautaro", "Alegria", 11223344, "masculino", 101010, 25000, "mañana");
echo "Nombre y Apellido: " . $empleadoTest->GetNombre() . " " . $empleadoTest->GetApellido() . "<br/>";
echo "DNI: " . $empleadoTest->GetDni() . " - " . "Legajo: " . $empleadoTest->GetLegajo() . "<br/>";
echo "Sexo: " . $empleadoTest->GetSexo() . "<br/>";
echo "Sueldo: " . $empleadoTest->GetSueldo() . "<br/>";
echo "Turno: " . $empleadoTest->GetTurno() . "<br/><br/>";

echo "--> Empleado ToString().<br/>";
echo $empleadoTest->ToString();

echo "<br/><br/>";
echo "--> Funcion Hablar().<br/>";
$idiomas = array("ingles", "Ruso", "frances");
echo $empleadoTest->Hablar($idiomas);
?>