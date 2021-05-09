<?php

require_once("./validarSesion.php");
require_once("./Clases/empleado.php");

$path = "./archivos/empleados.txt";
$archivo = fopen($path, "r");

echo"

<table align=\"center\" style='border-collapse:collapse;'>
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
    </tr>
    <tr style='text-align:center;font-size:20px;font-weight:bold;padding:25px;border:1px solid black;'>
        <td width=80px>Nombre</td>
        <td width=80px>Apellido</td>
        <td width=80px>Dni</td>
        <td width=80px>Sexo</td>
        <td width=80px>Legajo</td>
        <td width=80px>Sueldo</td>
        <td width=80px>Turno</td>
        <td width=80px>Foto</td>
        <td colspan='2'>Acciones</td>
    </tr>";


while(!feof($archivo)){
    // 'trim()' -> elimina espacios en blanco al inicio y final de la cadena
    $unEmpleado = trim(fgets($archivo));
    // Si lo que obtengo con 'fgets()' es mayor a cero...
    if(strlen($unEmpleado) > 0){
        // Con 'explode()' divido una cadena de acuerdo a un seaprador pasado por parametro, retorna un array
        $arrayEmpleado = explode(" - ", $unEmpleado);
        $nuevoEmpleado = new Empleado($arrayEmpleado[0], $arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[3],$arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
        $nuevoEmpleado->SetPathFoto($arrayEmpleado[7]);
        echo "<tr style='text-align:center;font-size:16px;padding:25px;border:1px solid black;'>";
        echo "<td>" . $nuevoEmpleado->GetNombre() . "</td>";
        echo "<td>" . $nuevoEmpleado->GetApellido() . "</td>";
        echo "<td>" . $nuevoEmpleado->GetDni() . "</td>";
        echo "<td>" . $nuevoEmpleado->GetSexo() . "</td>";
        echo "<td>" . $nuevoEmpleado->GetLegajo() . "</td>";
        echo "<td>" . $nuevoEmpleado->GetSueldo() . "</td>";
        echo "<td>" . $nuevoEmpleado->GetTurno() . "</td>";
        echo "<td><img src='" . $nuevoEmpleado->GetPathFoto() . "' style='width:90px;height:90px;'></td> ";
        echo "<td><input type='button' value='Eliminar' onClick='EliminarEmpleado(" . $nuevoEmpleado->GetLegajo() . ")' /></td>";
        echo "<td><input type='button' value='Modificar' onClick='ModificarUsuario(" . $nuevoEmpleado->GetDni() . ")' /></td></tr>";
        
    }
}
fclose($archivo);

?>