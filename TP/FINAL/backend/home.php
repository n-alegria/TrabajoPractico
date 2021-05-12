<?php
require_once("./validarSesion.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../FRONTEND/javascript/funciones.js"></script>
    <title>ABM Empelados - Archivos</title>
    <style>
        table{
            margin: 0 auto;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td colspan="2" style="border:1px solid black;">
                <h1 style="text-align:center;"><?php echo($_SESSION['nombre'] . " " . $_SESSION["apellido"])?></h1>
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;padding:20px;"><div id="formularioEmpleado"></div></td>
            <td style="border:1px solid black;padding:20px;"><div id="mostrarEmpleados"></div></td>
        </tr>
        <tr>
            <td colspan="2" style="border:1px solid black;padding:20px;text-align:right;font-size:25px;font-weight:bold;">
                <a style="color:black;" href="./cerrarSesion.php">Cerrar Sesion</a>
            </td>
        </tr>
    </table>
</body>
</html>