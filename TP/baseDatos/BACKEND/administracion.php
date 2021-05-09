<?php

require_once("./validarSesion.php");
require_once("./Clases/AccesoDatos.php");

$dni = $_POST["txtDni"];
$nombre = $_POST["txtNombre"];
$apellido = $_POST["txtApellido"];
$sexo = $_POST["cboSexo"];
$legajo = $_POST["txtLegajo"];
$sueldo = $_POST["txtSueldo"];
$turno = $_POST["rdoTurno"];

// Uso esta ruta para las verificaciones
$destino = "./fotos/" . $_FILES["fileFoto"]["name"];
$uploadOk = TRUE;

// Que sea una imagen
$esImagen = getimagesize($_FILES["fileFoto"]["tmp_name"]);
if(!$esImagen){
    echo "No se pudo subir el archivo ya que no es una imagen<br/>";
}
else{
    // Extension valida
    $tipoArchivo = pathinfo($destino, PATHINFO_EXTENSION);
    // echo "Tipo de archivo: " . $tipoArchivo."<br/>";
    if($tipoArchivo != "JPG" && $tipoArchivo != "BMP" && $tipoArchivo != "GIF" && $tipoArchivo != "PNG" && $tipoArchivo != "JPEG"){
        echo "Solo son permitidas las siguientes extensiones: JPG, JPEG, BMP ,PNG o GIF<br/>";
        $uploadOk = FALSE;
    }
    // Tamaño valido
    // echo "Tamaño: " . $_FILES["fileFoto"]["size"]."<br/>";
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
        // $fabrica = new Fabrica("Cosan", 7);
        // $fabrica->TraerDeArchivo($path);
        // foreach ($fabrica->GetEmpleados() as $empleado) {
        //     if($empleado->GetDni() == $dni){
        //         $fabrica->EliminarEmpleado($empleado);
        //         $fabrica->GuardarEnArchivo($path);
        //         unlink($empleado->GetPathFoto());
        //         break;
        //     }
        // }
        
        $pathDestino = "./fotos/" . $dni . "-" . "$apellido" . "." . $tipoArchivo;        

        $pdo = AccesoDatos::DameUnObjetoAcceso();
        $consulta = $pdo->RetornarConsulta("INSERT INTO empleados (nombre, apellido, dni, sexo, legajo, sueldo, turno, foto) 
                                            VALUES (:nombre, :apellido, :dni, :sexo, :legajo, :sueldo, :turno, :foto)");
        $consulta->bindParam(":nombre", $nombre, PDO::PARAM_STR);
        $consulta->bindParam(":apellido", $apellido, PDO::PARAM_STR);
        $consulta->bindParam(":dni", $dni, PDO::PARAM_INT);
        $consulta->bindParam(":sexo", $sexo, PDO::PARAM_STR);
        $consulta->bindParam(":legajo", $legajo, PDO::PARAM_INT);
        $consulta->bindParam(":sueldo", $sueldo, PDO::PARAM_INT);
        $consulta->bindParam(":turno", $turno, PDO::PARAM_STR);
        $consulta->bindParam(":foto", $pathDestino, PDO::PARAM_STR);
        $consulta->execute();
        if($consulta->rowCount()){
            move_uploaded_file($_FILES["fileFoto"]["tmp_name"], $pathDestino);
            echo "Usuario ingresado con exito";
        }
        else{
            echo "Error al ingresar al empleado";
        }
    }
}


?>