function AdministrarValidaciones() {
    var dni = parseInt(document.getElementById("txtDni").value);
    var legajo = parseInt(document.getElementById("txtLegajo").value);
    var sueldo = parseInt(document.getElementById("txtSueldo").value);
    var turno = ObtenerTurnoSeleccionado();
    var retorno = true;
    // Validar campos vacios
    if ((!ValidarCamposVacios("txtDni")) || (!ValidarCamposVacios("txtApellido")) || (!ValidarCamposVacios("txtNombre")) || !ValidarCamposVacios("txtLegajo") || !ValidarCamposVacios("txtSueldo")) {
        retorno = false;
        alert("No se permiten campos vacios");
        console.log("Un campo del formulario se encuentra vacio");
    }
    // Validacion campo vacio y rango "txtDni"
    if (!(ValidarRangoNumerico(dni, 1000000, 55000000))) {
        retorno = false;
        if (dni < 1000000)
            alert("EL numero es inferior a 1000000");
        else
            alert("El numero es superior a 55000000");
        console.log("Error en DNI");
    }
    // Validacion "cboSexo"
    if (!ValidarCombo("cboSexo", "---")) {
        retorno = false;
        console.log("Error en Sexo");
    }
    // Validacion rango "txtLegajo"
    if (!ValidarRangoNumerico(legajo, 100, 500)) {
        retorno = false;
        if (legajo < 100)
            alert("EL numero es inferior a 100");
        else
            alert("El numero es superior a 500");
        console.log("Error en Legajo");
    }
    // Validacion rango "txtSueldo"
    if (!ValidarRangoNumerico(sueldo, 8000, 25000)) {
        retorno = false;
        console.log("Error en sueldo");
        if (sueldo < 8500)
            alert("EL numero es inferior a 8500");
        else
            alert("El numero es superior a 25000");
    }
    // Validacion sueldo segun turno
    if (sueldo > ObtenerSueldoMaximo(turno)) {
        retorno = false;
        console.log("Error en Sueldo");
        alert("El sueldo ingresado no es valido de acuerdo al Turno");
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
        case "Mañana":
            sueldo = 20000;
            break;
        case "Tarde":
            sueldo = 18500;
            break;
        case "Noche":
            sueldo = 25000;
            break;
    }
    return sueldo;
}
