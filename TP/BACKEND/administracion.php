<?php

require_once("./validarSesion.php");
require_once("./Clases/fabrica.php");

$dni = $_POST["txtDni"];
$nombre = $_POST["txtNombre"];
$apellido = $_POST["txtApellido"];
$sexo = $_POST["cboSexo"];
$legajo = $_POST["txtLegajo"];
$sueldo = $_POST["txtSueldo"];
$turno = $_POST["rdoTurno"];
$hdnModificar = $_POST["hdnModificar"];

$path = "./archivos/empleados.txt";

echo "
<!DOCTYPE html>
<html lang=\"es\">
<head>
    <meta charset=\"UTF-8\">
    <title>Administracion</title>
</head>
<body>

<h2>Administracion</h2>
";

// Si existe el empleado lo borro
if(isset($hdnModificar)){
    // ruta del archivo
    $path = "./archivos/empleados.txt";
    // Abro el archivo en modo lectura
    $archivo = fopen($path, "r");
    // Ejecuto mientras no se llegue al final del archivo
    while(!feof($archivo)){
        // Obtengo una fila del archivo, con 'trim' elimino espacios en blanco
        $empleadoAux = trim(fgets($archivo));
        if(strlen($empleadoAux) > 0){
            // Creo un array de empleado con los datos leidos del archivo
            $arrayEmpelado = explode(" - ", $empleadoAux);
            // Compruebo que el dni coincida con un empelado del archivo
            if($dni == $arrayEmpelado[2]){
                // Creo al empleado con los datos del array
                $empleadoBorrar = new Empleado($arrayEmpelado[0], $arrayEmpelado[1], $arrayEmpelado[2], $arrayEmpelado[3], $arrayEmpelado[4], $arrayEmpelado[5], $arrayEmpelado[6]);
                $empleadoBorrar->SetPathFoto($arrayEmpelado[7]);
                fclose($archivo);

                $fabricaAux = new Fabrica("Cosan", 7);
                $fabricaAux->TraerDeArchivo("./archivos/empleados.txt");

                if($fabricaAux->EliminarEmpleado($empleadoBorrar)){
                    unlink($empleadoBorrar->GetPathFoto());
                    $fabricaAux->GuardarEnArchivo("./archivos/empleados.txt");
                }
                break;
            }
        }
    }
}




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
        $pathDestino = "./fotos/" . $dni . "-" . "$apellido" . "." . $tipoArchivo;
        
        $nuevoEmpleado = new Empleado($nombre, $apellido, $dni, $sexo, $legajo, $sueldo, $turno);
        $nuevoEmpleado->SetPathFoto($pathDestino);
        
        move_uploaded_file($_FILES["fileFoto"]["tmp_name"], $pathDestino);

        $fabrica = new Fabrica("Cosan", 7);
        $path = "./archivos/empleados.txt";
        $fabrica->TraerDeArchivo($path);
        if($fabrica->AgregarEmpleado($nuevoEmpleado)){
            $fabrica->GuardarEnArchivo($path);
            echo "<a href='./mostrar.php'>Mostrar</a>";
        }
        else{
            echo "Error al ingresar al empleado<br/>";
            echo "<a href='../BACKEND/index.php'>Pagina Principal</a>";
        }
    }
    else{
        echo "<a href='../BACKEND/index.php'>Pagina Principal</a>";
    }
}

echo "
</body>
</html>";

?>