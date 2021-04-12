function AdministrarValidaciones() {
    var dni = parseInt(document.getElementById("txtDni").value);
    var legajo = parseInt(document.getElementById("txtLegajo").value);
    var sueldo = parseInt(document.getElementById("txtSueldo").value);
    var turno = ObtenerTurnoSeleccionado();
    var retorno = true;
    // Validacion 'txtDni' -> vacio y rango
    if ((!ValidarCamposVacios("txtDni")) || !(ValidarRangoNumerico(dni, 1000000, 55000000))) {
        AdministrarSpanError("txtDni", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("txtDni", false);
    }
    // Validacion 'txtApellido' -> vacio
    if (!ValidarCamposVacios("txtApellido")) {
        AdministrarSpanError("txtApellido", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("txtApellido", false);
    }
    // Validacion 'txtNombre' -> vacio
    if (!ValidarCamposVacios("txtNombre")) {
        AdministrarSpanError("txtNombre", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("txtNombre", false);
    }
    // Validacion "cboSexo"
    if (!ValidarCombo("cboSexo", "---")) {
        AdministrarSpanError("cboSexo", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("cboSexo", false);
    }
    // Validacion rango "txtLegajo"
    if (!ValidarCamposVacios("txtLegajo") || !ValidarRangoNumerico(legajo, 100, 550)) {
        AdministrarSpanError("txtLegajo", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("txtLegajo", false);
    }
    // Validacion rango "txtSueldo"
    if (!ValidarCamposVacios("txtSueldo") || !ValidarRangoNumerico(sueldo, 8000, 25000) || sueldo > ObtenerSueldoMaximo(turno)) {
        AdministrarSpanError("txtSueldo", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("txtSueldo", false);
    }
    return retorno;
}
function ValidarCamposVacios(idcampo) {
    var retorno = true;
    var campo = document.getElementById(idcampo);
    if (campo.value == null || campo.value.length == 0) {
        retorno = false;
    }
    return retorno;
}
function ValidarRangoNumerico(campo, minimo, maximo) {
    var retorno = false;
    if (campo >= minimo && campo <= maximo) {
        retorno = true;
    }
    return retorno;
}
function ValidarCombo(idCombo, sexoContrario) {
    // Retorna 'true' si NO coincide o 'false' caso contrario
    var retorno = true;
    var sexo = document.getElementById(idCombo).value;
    if (sexo === sexoContrario)
        retorno = false;
    return retorno;
}
function ObtenerTurnoSeleccionado() {
    var retorno = "";
    // Retorna un 'array' con los valores del grupo de radioButtons
    // Debo recorrerlos y verificar que el 'checked' este activo
    var turno = (document.getElementsByName("rdoTurno"));
    for (var i = 0; i < turno.length; i++) {
        if (turno[i].checked) {
            retorno = turno[i].value;
        }
    }
    return retorno;
}
function ObtenerSueldoMaximo(turnoElegido) {
    var sueldo = 0;
    switch (turnoElegido) {
        case "M":
            sueldo = 20000;
            break;
        case "T":
            sueldo = 18500;
            break;
        case "N":
            sueldo = 25000;
            break;
    }
    return sueldo;
}
///////////////////////////////////////////////////////////////////////////
function AdministrarValidacionesLogin() {
    var dni = parseInt(document.getElementById("txtDni").value);
    if (!ValidarCamposVacios("txtDni") || !ValidarRangoNumerico(dni, 1000000, 55000000)) {
        AdministrarSpanError("txtDni", true);
    }
    else {
        AdministrarSpanError("txtDni", false);
    }
    if (!ValidarCamposVacios("txtApellido")) {
        AdministrarSpanError("txtApellido", true);
    }
    else {
        AdministrarSpanError("txtApellido", false);
    }
    return VerificarValidacionesLogin();
}
function AdministrarSpanError(idcampo, mostrar) {
    if (mostrar) {
        document.getElementById(idcampo).nextElementSibling.style.display = "block";
    }
    else {
        document.getElementById(idcampo).nextElementSibling.style.display = "none";
    }
}
function VerificarValidacionesLogin() {
    var retorno = true;
    var spans = document.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].style.display == "block") {
            retorno = false;
            break;
        }
    }
    return retorno;
}
