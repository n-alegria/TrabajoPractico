<?php
require_once("./validarSesion.php");
require_once("./Clases/fabrica.php");

$titulo = 'Alta de Empleados';
$dniUsuario = null;
$apellidoUsuario = null;
$nombreUsuario = null;
$sexoUsuario = null;
$legajoUsuario = null;
$sueldoUsuario = null;
$turnoUsuario = null;
$fotoUsuario = null;
$boton = "Enviar";

if(isset($_POST['hiddenModificar'])){
    $dni = $_POST['hiddenModificar'];
    $fabrica = new Fabrica("Cosan", 7);
    $fabrica->TraerDeArchivo('./archivos/empleados.txt');
    $arrayEmpleados = $fabrica->GetEmpleados();
    foreach ($arrayEmpleados as $empleado) {
        if($dni == $empleado->GetDni()){
            $tituloPagina = 'HTML5 Formulario Modificar Empleado';
            $titulo = 'Modificar Empleado';
            $dniUsuario = $empleado->GetDni();
            $apellidoUsuario = $empleado->GetApellido();
            $nombreUsuario = $empleado->GetNombre();
            $sexoUsuario = $empleado->GetSexo();
            $legajoUsuario = $empleado->GetLegajo();
            $sueldoUsuario = $empleado->GetSueldo();
            $turnoUsuario = $empleado->GetTurno();
            $fotoUsuario = $empleado->GetPathFoto();
            $boton = "Modificar";
            break;
        }
    }
}

?>


<table align="center">
    <!-- Titulo: Datos Personales -->
    <tr>
        <td>
            <h4>Datos Personales</h4>
        </td>
    </tr>
    <!-- Division horizontal -->
    <tr>
        <td colspan="2">
            <hr />
        </td>
    </tr>
    <!-- Input: DNI -->
    <tr>
        <td><label for="txtDni">DNI:</label></td>
        <td>
            <input type="number" id="txtDni" name="txtDni" min="1000000" max="55000000" <?php if($dniUsuario != null){ echo "value='{$dniUsuario}' readonly"; }?>/>
            <span style="display: none;">*</span>
        </td>
    </tr>
    <!-- Input: Apellido -->
    <tr>
        <td><label for="txtApellido">Apellido:</label></td>
        <td>
            <input type="text" id="txtApellido" name="txtApellido" <?php echo "value='{$apellidoUsuario}'"?>/>
            <span style="display: none;">*</span>
        </td>
    </tr>
    <!-- Input: Nombre -->
    <tr>
        <td><label for="txtNombre">Nombre:</label></td>
        <td>
            <input type="text" id="txtNombre" name="txtNombre" <?php echo "value='{$nombreUsuario}'"?> />
            <span style="display: none;">*</span>
        </td>
    </tr>
    <!-- ComboBox: Sexo -->
    <tr>
        <td><label for="cboSexo">Sexo:</label></td>
        <td>
            <select id="cboSexo" name="cboSexo" >
                    <option value="---" <?php if($sexoUsuario == null) echo "selected"; ?> >Seleccione</option>
                    <option value="M" <?php if($sexoUsuario == "M") echo "selected";  ?> >Masculino</option>
                    <option value="F" <?php if($sexoUsuario == "F") echo "selected"; ?> >Femenino</option>
            </select>
            <span style="display: none;">*</span>
        </td>
    </tr>
    <!-- Titulo: Datos Laborales -->
    <tr>
        <td>
            <h4>Datos Laborales</h4>
        </td>
    </tr>
    <!-- Division Horizontal -->
    <tr>
        <td colspan="2">
            <hr/>
        </td>
    </tr>
    <!-- Input: Legajo -->
    <tr>
        <td><label for="txtLegajo">Legajo:</label></td>
        <td>
            <input type="number" id="txtLegajo" name="txtLegajo" min="100" max="550" <?php if($legajoUsuario != null){ echo "value='{$legajoUsuario}' readonly"; } ?> />
            <span style="display: none;">*</span>
        </td>
    </tr>
    <!-- Input: Sueldo -->
    <tr>
        <td><label for="txtSueldo">Sueldo:</label></td>
        <td>
            <input type="number" name="txtSueldo" id="txtSueldo" min="8000" step="500" <?php echo "value='{$sueldoUsuario}'" ?>>
            <span style="display: none;">*</span>
        </td>
    </tr>
    <!-- Radio: Turno -->
    <tr>
        <td><label for="rdoTurnoMañana">Turno:</label></td>
    </tr>
    <tr>
        <td style="text-align:left; padding-left:50px">
            <input type="radio" name="rdoTurno" value="M" id='rdoTurnoMañana' <?php if($turnoUsuario == null || $turnoUsuario == "M") echo "checked"; ?> >Mañana<br/>
            <input type="radio" name="rdoTurno" value="T" id='rdoTurnoTarde' <?php if($turnoUsuario == 'T') echo "checked"; ?> >Tarde<br/>
            <input type="radio" name="rdoTurno" value="N" id='rdoTurnoNoche' <?php if($turnoUsuario == 'N') echo "checked"; ?> >Noche<br/>
        </td>
    </tr>
    <!-- Files -->
    <tr>
        <td><label for="fileFoto">Foto:</label></td>
        <td>
            <input type="file" name="fileFoto" id="fileFoto"  <?php echo "value='{$fotoUsuario}'"  ?> >
            <span style="display:none">*</span>
        </td>
    </tr>
    <!-- Division horizontal -->
    <tr>
        <td colspan="2">
            <hr/>
        </td>
    </tr>
    <!-- Botones 'reset' y 'submit' -->
    <tr>
        <td colspan="2" align="right">
            <input type="reset" value="Limpiar" />
        </td>
    </tr>
    <tr>
        <td colspan="2" align="right">
            <input type="submit"  onClick="ObtenerDatosUsuario()" id="btnEnviar" value="<?php echo $boton?>"/>
        </td>
    </tr>
    </table>

