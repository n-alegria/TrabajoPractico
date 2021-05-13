<?php

require_once "./validarSesion.php";
require_once __DIR__ . '/composer/vendor/autoload.php';
require_once "./Clases/AccesoDatos.php";

$tabla = '
<table align="center" style="border-collapse:collapse;">
<tr> <td colspan="10"> <h2>Listado de Empleados</h2> </td> </tr>
<tr> <td> <h4>Info</h4> </td> </tr>
<tr> <td colspan="10"> <hr> </td> </tr>
<tr style="text-align:center;font-size:20px;font-weight:bold;padding:25px;border:1px solid black;background-color:lightblue;">
    <td style="text-align:center" width=80px>Nombre</td>
    <td style="text-align:center" width=80px>Apellido</td>
    <td style="text-align:center" width=80px>Dni</td>
    <td style="text-align:center" width=80px>Sexo</td>
    <td style="text-align:center" width=80px>Legajo</td>
    <td style="text-align:center" width=80px>Sueldo</td>
    <td style="text-align:center" width=80px>Turno</td>
    <td style="text-align:center" width=80px>Foto</td>
</tr>';
$pdo = AccesoDatos::DameUnObjetoAcceso();
$cursor = $pdo->RetornarConsulta('SELECT * FROM empleados');
$cursor->execute();
if($cursor->rowCount()){
    while($user = $cursor->fetch(PDO::FETCH_OBJ)){
        $tabla .= "
        <tr style='text-align:center;font-size:16px;padding:25px;border:1px solid black;'>
            <td>" . $user->nombre . "</td>
            <td> " .$user->apellido . "</td>
            <td> " .$user->dni . "</td>
            <td> " .$user->sexo . "</td>
            <td> " .$user->legajo . "</td>
            <td> " .$user->sueldo . "</td>
            <td> " .$user->turno . "</td>
            <td><img src='" . $user->foto . "' style='width:90px;height:90px;'></td>
        </tr>";
    }
}
$tabla .= "</table>";

$mpdf = new \Mpdf\Mpdf(['orientation' => 'P',
                        'pagenumPrefix' => 'Pagina nro. ',
                        'nbpgPrefix' => ' de ',
                        'nbpgSuffix' => ' páginas'
                        ]);

$mpdf->SetProtection(array(), $_SESSION["DNIEmpleado"]);
$mpdf->SetHeader('Alegria Nestor||{PAGENO}{nbpg}');
$mpdf->SetFooter($_SERVER["REQUEST_URI"]);
$mpdf->WriteHTML($tabla);
$mpdf->Output('listadoEmpleados.pdf', 'I');  