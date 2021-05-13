<?php require_once("./validarSesion.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../frontend/javascript/funciones_bd.js"></script>
    <title>ABM Empelados - Bases de Datos</title>
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
            <!-- <form action="./composer/pdf.php" method="POST">
                <input type="hidden" name="pass" value="<?php echo $_SESSION["DNIEmpleado"] ?>">
                <input type="submit" value="Enviar datos">
            </form> -->
                <a style="color:black;margin-right:25px;" target='_blank' href="./pdf.php">Listado PDF</a>
                <a style="color:black;" href="./cerrarSesion.php">Cerrar Sesion</a>
            </td>
        </tr>
    </table>
</body>
</html>