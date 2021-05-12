var Ajax = /** @class */ (function () {
    function Ajax() {
        var _this = this;
        this.Get = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
            _this.xhr.open('GET', ruta);
            _this.xhr.send();
            _this.xhr.onreadystatechange = function () {
                if (_this.xhr.readyState === Ajax.DONE) {
                    if (_this.xhr.status === Ajax.OK) {
                        success(_this.xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this.xhr.status);
                        }
                    }
                }
            };
        };
        this.Post = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            _this.xhr.open('POST', ruta, true);
            if (typeof (params) == "string") {
                _this.xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            }
            else {
                _this.xhr.setRequestHeader("enctype", "multipart/form-data");
            }
            _this.xhr.send(parametros);
            _this.xhr.onreadystatechange = function () {
                if (_this.xhr.readyState === Ajax.DONE) {
                    if (_this.xhr.status === Ajax.OK) {
                        success(_this.xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this.xhr.status);
                        }
                    }
                }
            };
        };
        this.xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }
    return Ajax;
}());
/// <reference path="ajax.ts" />
function AdministrarValidacionesBD() {
    var dni = parseInt(document.getElementById("txtDni").value);
    var legajo = parseInt(document.getElementById("txtLegajo").value);
    var sueldo = parseInt(document.getElementById("txtSueldo").value);
    var turno = ObtenerTurnoSeleccionadoBD();
    var retorno = true;
    // Validacion 'txtDni' -> vacio y rango
    if ((!ValidarCamposVaciosBD("txtDni")) || !(ValidarRangoNumericoBD(dni, 1000000, 55000000))) {
        AdministrarSpanErrorBD("txtDni", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("txtDni", false);
    }
    // Validacion 'txtApellido' -> vacio
    if (!ValidarCamposVaciosBD("txtApellido")) {
        AdministrarSpanErrorBD("txtApellido", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("txtApellido", false);
    }
    // Validacion 'txtNombre' -> vacio
    if (!ValidarCamposVaciosBD("txtNombre")) {
        AdministrarSpanErrorBD("txtNombre", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("txtNombre", false);
    }
    // Validacion "cboSexo"
    if (!ValidarComboBD("cboSexo", "---")) {
        AdministrarSpanErrorBD("cboSexo", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("cboSexo", false);
    }
    // Validacion rango "txtLegajo"
    if (!ValidarCamposVaciosBD("txtLegajo") || !ValidarRangoNumericoBD(legajo, 100, 550)) {
        AdministrarSpanErrorBD("txtLegajo", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("txtLegajo", false);
    }
    // Validacion rango "txtSueldo"
    if (!ValidarCamposVaciosBD("txtSueldo") || !ValidarRangoNumericoBD(sueldo, 8000, 25000) || sueldo > ObtenerSueldoMaximoBD(turno)) {
        AdministrarSpanErrorBD("txtSueldo", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("txtSueldo", false);
    }
    // Validacion "fileFoto"
    if (!ValidarCamposVaciosBD("fileFoto")) {
        AdministrarSpanErrorBD("fileFoto", true);
        retorno = false;
    }
    else {
        AdministrarSpanErrorBD("fileFoto", false);
    }
    return retorno;
}
function ValidarCamposVaciosBD(idcampo) {
    var retorno = true;
    var campo = document.getElementById(idcampo);
    if (campo.value == null || campo.value.length == 0) {
        retorno = false;
    }
    return retorno;
}
function ValidarRangoNumericoBD(campo, minimo, maximo) {
    var retorno = false;
    if (campo >= minimo && campo <= maximo) {
        retorno = true;
    }
    return retorno;
}
function ValidarComboBD(idCombo, sexoContrario) {
    // Retorna 'true' si NO coincide o 'false' caso contrario
    var retorno = true;
    var sexo = document.getElementById(idCombo).value;
    if (sexo === sexoContrario)
        retorno = false;
    return retorno;
}
function ObtenerTurnoSeleccionadoBD() {
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
function ObtenerSueldoMaximoBD(turnoElegido) {
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
function AdministrarValidacionesLoginBD(e) {
    var dni = parseInt(document.getElementById("txtDni").value);
    if (!ValidarCamposVaciosBD("txtDni") || !ValidarRangoNumericoBD(dni, 1000000, 55000000)) {
        AdministrarSpanErrorBD("txtDni", true);
    }
    else {
        AdministrarSpanErrorBD("txtDni", false);
    }
    if (!ValidarCamposVaciosBD("txtApellido")) {
        AdministrarSpanErrorBD("txtApellido", true);
    }
    else {
        AdministrarSpanErrorBD("txtApellido", false);
    }
    if (!VerificarValidacionesLoginBD()) {
        e.preventDefault();
    }
    else {
        AltaUsuarioBD();
    }
}
function AdministrarSpanErrorBD(idcampo, mostrar) {
    if (mostrar) {
        document.getElementById(idcampo).nextElementSibling.style.display = "block";
    }
    else {
        document.getElementById(idcampo).nextElementSibling.style.display = "none";
    }
}
function VerificarValidacionesLoginBD() {
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
// Funcion Modificar
///////////////////////////////////////////////////////////////////////////
function AdministrarModificarBD(dniEmpleado) {
    document.getElementById("hiddenModificar").value = dniEmpleado;
    document.getElementById("formModificar").submit();
}
///////////////////////////////////////////////////////////////////////////
// AJAX
///////////////////////////////////////////////////////////////////////////
window.onload = function () {
    ActualizarPaginaBD();
};
var ActualizarPaginaBD = function () {
    ActualizarFormBD();
    MostrarEmpleadosBD();
};
function ActualizarFormBD() {
    var ajax = new Ajax();
    ajax.Post('./index_bd.php', function (respuesta) {
        var formulario = document.getElementById('formularioEmpleado');
        formulario.innerHTML = respuesta;
    }, "");
}
function MostrarEmpleadosBD() {
    var ajax = new Ajax();
    ajax.Post('./mostrar_bd.php', function (respuesta) {
        var mostrar = document.getElementById('mostrarEmpleados');
        mostrar.innerHTML = respuesta;
    }, "");
}
function EliminarEmpleadoBD(legajo) {
    var parametros = "legajo=" + legajo;
    var ajax = new Ajax();
    ajax.Get("./eliminar_bd.php", function (respuesta) {
        console.clear();
        console.log(respuesta);
        MostrarEmpleadosBD();
    }, parametros);
}
function AltaUsuarioBD() {
    if (AdministrarValidacionesBD()) {
        var dni = document.getElementById('txtDni').value;
        var apellido = document.getElementById('txtApellido').value;
        var nombre = document.getElementById('txtNombre').value;
        var sexo = document.getElementById('cboSexo').value;
        var legajo = document.getElementById('txtLegajo').value;
        var sueldo = document.getElementById('txtSueldo').value;
        var turno = ObtenerTurnoSeleccionadoBD();
        var foto = document.getElementById('fileFoto');
        var parametros = new FormData();
        parametros.append('txtDni', dni);
        parametros.append('txtNombre', nombre);
        parametros.append('txtApellido', apellido);
        parametros.append('cboSexo', sexo);
        parametros.append('txtLegajo', legajo);
        parametros.append('txtSueldo', sueldo);
        parametros.append('rdoTurno', turno);
        parametros.append('fileFoto', foto.files[0]);
        var ajaxAlta_1 = new XMLHttpRequest();
        ajaxAlta_1.open('POST', './administracion_bd.php');
        ajaxAlta_1.setRequestHeader("enctype", "multipart/form-data");
        ajaxAlta_1.send(parametros);
        ajaxAlta_1.onreadystatechange = function () {
            if (ajaxAlta_1.readyState == 4 && ajaxAlta_1.status == 200) {
                console.clear();
                console.log(ajaxAlta_1.responseText);
                ActualizarPaginaBD();
            }
        };
    }
}
function ModificarUsuarioBD(dni) {
    var ajaxModificar = new Ajax();
    var parametro = "hiddenModificar=" + dni;
    ajaxModificar.Post('./index_bd.php', function (respuesta) {
        console.log(respuesta);
        var formulario = document.getElementById('formularioEmpleado');
        formulario.innerHTML = respuesta;
    }, parametro);
}
function ModificarBD() {
    if (AdministrarValidacionesBD()) {
        var dni = document.getElementById('txtDni').value;
        var apellido = document.getElementById('txtApellido').value;
        var nombre = document.getElementById('txtNombre').value;
        var sexo = document.getElementById('cboSexo').value;
        var legajo = document.getElementById('txtLegajo').value;
        var sueldo = document.getElementById('txtSueldo').value;
        var turno = ObtenerTurnoSeleccionadoBD();
        var foto = document.getElementById('fileFoto');
        var parametros = new FormData();
        parametros.append('txtDni', dni);
        parametros.append('txtNombre', nombre);
        parametros.append('txtApellido', apellido);
        parametros.append('cboSexo', sexo);
        parametros.append('txtLegajo', legajo);
        parametros.append('txtSueldo', sueldo);
        parametros.append('rdoTurno', turno);
        parametros.append('fileFoto', foto.files[0]);
        parametros.append('hiddenModificar', 'TRUE');
        var ajaxModif_1 = new XMLHttpRequest();
        ajaxModif_1.open('POST', './administracion_bd.php');
        ajaxModif_1.setRequestHeader("enctype", "multipart/form-data");
        ajaxModif_1.send(parametros);
        ajaxModif_1.onreadystatechange = function () {
            if (ajaxModif_1.readyState == 4 && ajaxModif_1.status == 200) {
                console.clear();
                console.log(ajaxModif_1.responseText);
                ActualizarPaginaBD();
            }
        };
    }
}
