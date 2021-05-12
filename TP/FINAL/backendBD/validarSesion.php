<?php

session_start();

if(!isset($_SESSION["DNIEmpleado"])){
    header("location: ../default.php");
}

?>