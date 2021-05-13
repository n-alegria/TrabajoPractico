<?php

require_once("./validarSesion.php");
require_once("./Clases/AccesoDatos.php");

echo"
<table align=\"center\" style='border-collapse:collapse;'>
    <tr><td colspan='10'><h2>Listado de Empleados</h2></td>
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


    $pdo = AccesoDatos::DameUnObjetoAcceso();
    $cursor = $pdo->RetornarConsulta("SELECT * FROM empleados");
    $cursor->execute();
    if($cursor->rowCount()){
        while($user = $cursor->fetch(PDO::FETCH_OBJ)){
            echo "<tr style='text-align:center;font-size:16px;padding:25px;border:1px solid black;'>";
            echo "<td>" . $user->nombre . "</td>";
            echo "<td>" . $user->apellido . "</td>";
            echo "<td>" . $user->dni . "</td>";
            echo "<td>" . $user->sexo . "</td>";
            echo "<td>" . $user->legajo . "</td>";
            echo "<td>" . $user->sueldo . "</td>";
            echo "<td>" . $user->turno . "</td>";
            echo "<td><img src='" . $user->foto . "' style='width:90px;height:90px;'></td> ";
            echo "<td><input type='button' value='Eliminar' onClick='EliminarEmpleadoBD(" . $user->legajo . ")' /></td>";
            echo "<td><input type='button' value='Modificar' onClick='ModificarUsuarioBD(" . $user->dni . ")' /></td></tr>";
        }
    }

?>