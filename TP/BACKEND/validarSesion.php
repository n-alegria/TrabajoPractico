<?php

session_start();

if(!isset($_SESSION["DNIEmpleado"])){
    header("location: ../FRONTEND/login.html");
}

?>