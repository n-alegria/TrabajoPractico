/// <reference path="ajax.ts" />
function AdministrarValidaciones(e) {
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
    // Validacion "fileFoto"
    if (!ValidarCamposVacios("fileFoto")) {
        AdministrarSpanError("fileFoto", true);
        retorno = false;
    }
    else {
        AdministrarSpanError("fileFoto", false);
    }
    if (!retorno) {
        e.preventDefault();
    }
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
function AdministrarValidacionesLogin(e) {
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
    if (!VerificarValidacionesLogin()) {
        e.preventDefault();
    }
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
///////////////////////////////////////////////////////////////////////////
function AdministrarModificar(dniEmpleado) {
    document.getElementById("hiddenModificar").value = dniEmpleado;
    document.getElementById("formModificar").submit();
}
///////////////////////////////////////////////////////////////////////////
// AJAX
///////////////////////////////////////////////////////////////////////////
window.onload = function () {
    // let ajax = new Ajax();
    // ajax.Post('./index.php', (resultado:string)=> {
    //     let formulario = (<HTMLDivElement>document.getElementById("formularioEmpleado"));
    //     console.clear();
    //     console.log(resultado);
    //     formulario.innerHTML = resultado;
    // },
    // "",
    // );
    var ajaxForm = new XMLHttpRequest();
    ajaxForm.open('POST', './index.php', true);
    ajaxForm.send();
    ajaxForm.onreadystatechange = function () {
        if (ajaxForm.readyState == 4 && ajaxForm.status == 200) {
            var formulario = document.getElementById('formularioEmpleado');
            formulario.innerHTML = ajaxForm.responseText;
        }
    };
    var ajaxMostrar = new XMLHttpRequest();
    ajaxMostrar.open('POST', './mostrar.php', true);
    ajaxMostrar.send();
    ajaxMostrar.onreadystatechange = function () {
        if (ajaxMostrar.readyState == 4 && ajaxMostrar.status == 200) {
            var mostrar = document.getElementById('mostrarEmpleados');
            mostrar.innerHTML = ajaxMostrar.responseText;
        }
    };
};
