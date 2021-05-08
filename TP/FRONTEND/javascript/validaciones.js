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
    else {
        ObtenerDatosUsuario();
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
    ActualizarPagina();
};
var ActualizarPagina = function () {
    ActualizarForm();
    MostrarEmpleados();
};
function ActualizarForm() {
    var ajaxForm = new Ajax();
    ajaxForm.Post('./indice.php', function (respuesta) {
        var formulario = document.getElementById('formularioEmpleado');
        formulario.innerHTML = "";
        formulario.innerHTML = respuesta;
    }, "");
}
function MostrarEmpleados() {
    var ajaxMostrar = new Ajax();
    ajaxMostrar.Post('./mostrar.php', function (respuesta) {
        var mostrar = document.getElementById('mostrarEmpleados');
        mostrar.innerHTML = "";
        mostrar.innerHTML = respuesta;
    }, "");
}
function EliminarEmpleado(legajo) {
    var ajax = new Ajax();
    var parametros = "legajo=" + legajo;
    ajax.Get("./BACKEND/eliminar.php", function (respuesta) {
        console.clear();
        console.log(respuesta);
        MostrarEmpleados();
    }, parametros);
}
function ObtenerDatosUsuario() {
    var dni = document.getElementById('txtDni').value;
    var apellido = document.getElementById('txtApellido').value;
    var nombre = document.getElementById('txtNombre').value;
    var sexo = document.getElementById('cboSexo').value;
    var legajo = document.getElementById('txtLegajo').value;
    var sueldo = document.getElementById('txtSueldo').value;
    var turno = ObtenerTurnoSeleccionado();
    var foto = document.getElementById('fileFoto').value;
    var form = new FormData();
    form.append('txtDni', dni);
    form.append('txtNombre', nombre);
    form.append('txtApellido', apellido);
    form.append('cboSexo', sexo);
    form.append('txtLegajo', legajo);
    form.append('txtSueldo', sueldo);
    form.append('rdoTurno', turno);
    form.append('fileFoto', foto);
    var ajaxModificar = new XMLHttpRequest();
    ajaxModificar.open("POST", './BACKEND/administracion.php');
    ajaxModificar.setRequestHeader("enctype", "multipart/form-data");
    ajaxModificar.send(form);
    ajaxModificar.onreadystatechange = function () {
        if (ajaxModificar.status == 200 && ajaxModificar.readyState == 4) {
            console.log(ajaxModificar.responseText);
        }
    };
}
