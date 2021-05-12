<?php

require_once("./validarSesion.php");
require_once("./Clases/AccesoDatos.php");

$legajo = $_GET['legajo'];

$pdo = AccesoDatos::DameUnObjetoAcceso();

$consulta = $pdo->RetornarConsulta("SELECT * FROM empleados WHERE empleados.legajo = :legajo");
$consulta->bindParam(':legajo', $legajo, PDO::PARAM_INT);
$consulta->execute();
$user = $consulta->fetch(PDO::FETCH_OBJ);

$cursor = $pdo->RetornarConsulta("DELETE FROM empleados WHERE empleados.legajo = :legajo");
$cursor->bindParam(':legajo', $legajo, PDO::PARAM_INT);
$cursor->execute();
if($cursor->rowCount()){
    echo "Empleado eliminado con exito.";
    unlink($user->foto);
}
else{
    echo "No se pudo eliminar al empleado";
}

?>