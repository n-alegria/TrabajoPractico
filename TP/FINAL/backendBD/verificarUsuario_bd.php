<?php
session_start();
require_once("./Clases/AccesoDatos.php");

$dni = $_POST["txtDni"];
$apellido = ucfirst($_POST["txtApellido"]);

$pdo = AccesoDatos::DameUnObjetoAcceso();
$cursor = $pdo->RetornarConsulta("SELECT * FROM usuarios WHERE usuarios.apellido = :apellido AND usuarios.dni = :dni");
$cursor->bindParam(":apellido", $apellido, PDO::PARAM_STR);
$cursor->bindParam(":dni", $dni, PDO::PARAM_INT);
$cursor->execute();
if($cursor->rowCount()){
    $user = $cursor->fetch(PDO::FETCH_OBJ);
    $_SESSION["DNIEmpleado"] = $user->dni;
    $_SESSION["nombre"] = $user->nombre;
    $_SESSION["apellido"] = $user->apellido;
    header("location: ./home_bd.php");
}
else{
    echo "<div style='display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;'>";
    echo "<div style='text-align: center;
    border: 1px solid black;
    padding: 50px;
    font-size: 35px;
    background-color: lightblue;'>";
    echo "<p>Usuario y/o contraseñas incorrectos</p>";
    echo "<a href='../default.php'>Login</a>";
    echo "</div>";
    echo "</div>";
}

?>