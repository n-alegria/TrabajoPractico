<?php

require_once("./validarSesion.php");
require_once("./Clases/AccesoDatos.php");

$dni = $_POST["txtDni"];
$nombre = ucfirst($_POST["txtNombre"]);
$apellido = ucfirst($_POST["txtApellido"]);
$sexo = ucfirst($_POST["cboSexo"]);
$legajo = $_POST["txtLegajo"];
$sueldo = $_POST["txtSueldo"];
$turno = ucfirst($_POST["rdoTurno"]);
$modificar = isset($_POST["hiddenModificar"]) ? TRUE : FALSE; 

// Uso esta ruta para las verificaciones
$destino = "./fotos_bd/" . $_FILES["fileFoto"]["name"];
$uploadOk = TRUE;

// Que sea una imagen
$esImagen = getimagesize($_FILES["fileFoto"]["tmp_name"]);
if(!$esImagen){
    echo "El archivo no es una imagen";
}
else{
    // Extension valida
    $tipoArchivo = strtolower(pathinfo($destino, PATHINFO_EXTENSION));
    // echo "Tipo de archivo: " . $tipoArchivo."<br/>";
    if($tipoArchivo != "jpg" && $tipoArchivo != "bmp" && $tipoArchivo != "gif" && $tipoArchivo != "png" && $tipoArchivo != "jpeg"){
        echo "Solo son permitidas las siguientes extensiones: JPG, JPEG, BMP ,PNG o GIF<br/>";
        $uploadOk = FALSE;
    }
    // Tamaño valido
    if($_FILES["fileFoto"]["size"] > 1000000){
        echo "El archivo es muy grande.<br/>";
        $uploadOk = FALSE;
    }
    // Que no exista
    if(file_exists($destino)){
        // echo "El archivo ya existe.<br/>";
        $uploadOk = FALSE;
    }
    if($uploadOk){
        $pathDestino = "./fotos_bd/" . $dni . "-" . "$apellido" . "." . $tipoArchivo;        
        $pdo = AccesoDatos::DameUnObjetoAcceso();
        switch($modificar){
            case TRUE:
                $query = $pdo->RetornarConsulta("SELECT * FROM empleados WHERE empleados.legajo = :legajo");
                $query->bindParam(':legajo', $legajo, PDO::PARAM_INT);
                $query->execute();
                $user = $query->fetch(PDO::FETCH_OBJ);

                $consulta = $pdo->RetornarConsulta("UPDATE empleados 
                                                    SET nombre = :nombre, apellido = :apellido, sexo = :sexo, sueldo = :sueldo, turno = :turno, foto = :foto
                                                    WHERE empleados.dni = :dni");
                $consulta->bindParam(":nombre", $nombre, PDO::PARAM_STR);
                $consulta->bindParam(":apellido", $apellido, PDO::PARAM_STR);
                $consulta->bindParam(":dni", $dni, PDO::PARAM_INT);
                $consulta->bindParam(":sexo", $sexo, PDO::PARAM_STR);
                $consulta->bindParam(":sueldo", $sueldo, PDO::PARAM_INT);
                $consulta->bindParam(":turno", $turno, PDO::PARAM_STR);
                $consulta->bindParam(":foto", $pathDestino, PDO::PARAM_STR);
                if($consulta->execute()){
                    unlink($pathDestino);
                    move_uploaded_file($_FILES["fileFoto"]["tmp_name"], $pathDestino);
                    echo "Usuario modificado con exito";
                }
                else{
                    echo "Error al modificar al empleado";
                }
                break;
            case FALSE:
                $consulta = $pdo->RetornarConsulta("INSERT INTO empleados (nombre, apellido, dni, sexo, legajo, sueldo, turno, foto) 
                                                    VALUES (:nombre, :apellido, :dni, :sexo, :legajo, :sueldo, :turno, :foto)");
                $consulta->bindParam(":nombre", ucfirst($nombre), PDO::PARAM_STR);
                $consulta->bindParam(":apellido", ucfirst($apellido), PDO::PARAM_STR);
                $consulta->bindParam(":dni", $dni, PDO::PARAM_INT);
                $consulta->bindParam(":sexo", ucfirst($sexo), PDO::PARAM_STR);
                $consulta->bindParam(":legajo", $legajo, PDO::PARAM_INT);
                $consulta->bindParam(":sueldo", $sueldo, PDO::PARAM_INT);
                $consulta->bindParam(":turno", ucfirst($turno), PDO::PARAM_STR);
                $consulta->bindParam(":foto", $pathDestino, PDO::PARAM_STR);
                $consulta->execute();
                if($consulta->rowCount()){
                    move_uploaded_file($_FILES["fileFoto"]["tmp_name"], $pathDestino);
                    echo "Usuario ingresado con exito";
                }
                else{
                    echo "Error al ingresar al empleado";
                }
                break;
        }

    }
}


?>