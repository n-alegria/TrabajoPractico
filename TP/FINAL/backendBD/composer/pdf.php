<?php

require_once '../Clases/fabrica.php';
require_once __DIR__ . '/vendor/autoload.php';
header('Content-type: application/pdf');

$listado = Fabrica::ListadoPDF();

$mpdf=new \Mpdf\Mpdf(); 

foreach($listado as $persona)
$mpdf->WriteHTML('<h1>Hola</h1>');
$mpdf->Output();  
