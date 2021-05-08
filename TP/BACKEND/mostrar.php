<?php

require_once("./Clases/empleado.php");
require_once("./validarSesion.php");

$path = "./archivos/empleados.txt";
$archivo = fopen($path, "r");

echo"
<form action='./home.php' method='POST' id='formModificar'>
<input type='hidden' value='Modificar' id='hiddenModificar' name='hiddenModificar'/>
</form>
<table align=\"center\">
    <tr><td><h2>Listado de Empleados</h2></td>
    </tr>
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
        echo "<td><input type='button' value='Eliminar' onClick='EliminarEmpleado(" . $nuevoEmpleado->GetLegajo() . ")' /></td>";
        echo "<td><input type='button' value='Modificar' onClick='AdministrarModificar(" . $nuevoEmpleado->GetDni() . ")' /></td></tr>";
        
    }
}
fclose($archivo);

?>