<?php

require_once("./validarSesion.php");

if(!$_SESSION){
    session_start();
}
session_unset();
session_destroy();

header("Location: ../default.php");
?>