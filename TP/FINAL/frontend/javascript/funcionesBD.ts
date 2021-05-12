/// <reference path="ajax.ts" />

function AdministrarValidacionesBD():boolean{
    let dni:number = parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
    let legajo:number = parseInt((<HTMLInputElement>document.getElementById("txtLegajo")).value);
    let sueldo:number = parseInt((<HTMLInputElement>document.getElementById("txtSueldo")).value);
    let turno:string = ObtenerTurnoSeleccionadoBD();

    let retorno : boolean = true;
    
    // Validacion 'txtDni' -> vacio y rango
    if((!ValidarCamposVaciosBD("txtDni")) || !(ValidarRangoNumericoBD(dni, 1000000, 55000000))){
        AdministrarSpanErrorBD("txtDni", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("txtDni", false);
    }
    
    // Validacion 'txtApellido' -> vacio
    if(!ValidarCamposVaciosBD("txtApellido")){
        AdministrarSpanErrorBD("txtApellido", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("txtApellido", false);
    }
    
    // Validacion 'txtNombre' -> vacio
    if(!ValidarCamposVaciosBD("txtNombre")){
        AdministrarSpanErrorBD("txtNombre", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("txtNombre", false);
    }
    
    // Validacion "cboSexo"
    if(!ValidarComboBD("cboSexo", "---")){
        AdministrarSpanErrorBD("cboSexo", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("cboSexo", false);
    }
    
    // Validacion rango "txtLegajo"
    if(!ValidarCamposVaciosBD("txtLegajo") || !ValidarRangoNumericoBD(legajo, 100, 550)){
        AdministrarSpanErrorBD("txtLegajo", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("txtLegajo", false);
    }

    // Validacion rango "txtSueldo"
    if(!ValidarCamposVaciosBD("txtSueldo") || !ValidarRangoNumericoBD(sueldo, 8000, 25000) || sueldo > ObtenerSueldoMaximoBD(turno)) {
        AdministrarSpanErrorBD("txtSueldo", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("txtSueldo", false);
    }

    // Validacion "fileFoto"
    if(!ValidarCamposVaciosBD("fileFoto")){
        AdministrarSpanErrorBD("fileFoto", true);
        retorno = false;
    }
    else{
        AdministrarSpanErrorBD("fileFoto", false);
    }
    return retorno;
    
}

function ValidarCamposVaciosBD(idcampo : string) : boolean{
    let retorno : boolean = true;
    let campo : any = (<HTMLInputElement>document.getElementById(idcampo));
    if(campo.value == null || campo.value.length == 0){
        retorno = false;
    }
    return retorno;
}

function ValidarRangoNumericoBD(campo : number, minimo : number, maximo : number) : boolean{
    let retorno = false;
    if(campo >= minimo && campo <= maximo){
        retorno = true;
    }
    return retorno;
}

function ValidarComboBD(idCombo : string, sexoContrario : string) : boolean{
    // Retorna 'true' si NO coincide o 'false' caso contrario
    let retorno : boolean = true;
    let sexo : any = (<HTMLInputElement>document.getElementById(idCombo)).value;
    if(sexo === sexoContrario)
        retorno = false;
    return retorno;
}

function ObtenerTurnoSeleccionadoBD() : string{
    let retorno : string = "";
    // Retorna un 'array' con los valores del grupo de radioButtons
    // Debo recorrerlos y verificar que el 'checked' este activo
    let turno : any = (document.getElementsByName("rdoTurno"));
    for (let i = 0; i < turno.length; i++) {
        if(turno[i].checked){
            retorno = turno[i].value;
        }
    }
    return retorno;
}

function ObtenerSueldoMaximoBD(turnoElegido : string) : number{
    let sueldo : number = 0;
    switch (turnoElegido){
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

function AdministrarValidacionesLoginBD(e : Event){
    let dni : number = parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
    if(!ValidarCamposVaciosBD("txtDni") || !ValidarRangoNumericoBD(dni, 1000000, 55000000)){
        AdministrarSpanErrorBD("txtDni", true);
    }
    else{
        AdministrarSpanErrorBD("txtDni", false);
    }
    if(!ValidarCamposVaciosBD("txtApellido")){
        AdministrarSpanErrorBD("txtApellido", true);
    }
    else{
        AdministrarSpanErrorBD("txtApellido", false);
    }

    if(!VerificarValidacionesLoginBD()){
        e.preventDefault();
    }
    else{
        AltaUsuarioBD();
    }
}

function AdministrarSpanErrorBD(idcampo : string, mostrar : boolean) : void{
    if(mostrar){
        (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById(idcampo)).nextElementSibling).style.display="block";
    }
    else{
        (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById(idcampo)).nextElementSibling).style.display = "none";
    }
}

function VerificarValidacionesLoginBD() : boolean{
    let retorno : boolean = true;
    let spans : NodeList = document.querySelectorAll("span");
    for (let i = 0; i < spans.length; i++) {
        if((<HTMLSpanElement>spans[i]).style.display == "block"){
            retorno = false;
            break;
        }
    }
    return retorno;
}

///////////////////////////////////////////////////////////////////////////
// Funcion Modificar
///////////////////////////////////////////////////////////////////////////

function AdministrarModificarBD(dniEmpleado : string) : void{
    (<HTMLInputElement>document.getElementById("hiddenModificar")).value = dniEmpleado;
    (<HTMLFormElement>document.getElementById("formModificar")).submit();
}

///////////////////////////////////////////////////////////////////////////
// AJAX
///////////////////////////////////////////////////////////////////////////
window.onload = ():void =>{
    ActualizarPaginaBD();
}

let ActualizarPaginaBD = ():void =>{
    ActualizarFormBD();
    MostrarEmpleadosBD();
}


function ActualizarFormBD(){
    let ajax = new Ajax();
    ajax.Post('./index_bd.php', (respuesta:string) =>{
        let formulario = (<HTMLInputElement>document.getElementById('formularioEmpleado'));
        formulario.innerHTML = respuesta;
    },
    "");
}

function MostrarEmpleadosBD(){
    let ajax = new Ajax();
    ajax.Post('./mostrar_bd.php', (respuesta:string)=>{
        let mostrar = (<HTMLInputElement>document.getElementById('mostrarEmpleados'));
        mostrar.innerHTML = respuesta;
    },
    "");
}

function EliminarEmpleadoBD(legajo: string){
    let parametros: string = `legajo=${legajo}`

    let ajax = new Ajax();
    ajax.Get("./eliminar_bd.php",
    (respuesta:string)=>{
        console.clear();
        console.log(respuesta);
        MostrarEmpleadosBD();
    },
    parametros,
    );
}

function AltaUsuarioBD(){
    if(AdministrarValidacionesBD()){
        let dni :string = (<HTMLInputElement>document.getElementById('txtDni')).value;
        let apellido :string = (<HTMLInputElement>document.getElementById('txtApellido')).value;
        let nombre :string = (<HTMLInputElement>document.getElementById('txtNombre')).value;
        let sexo :string = (<HTMLInputElement>document.getElementById('cboSexo')).value;
        let legajo :string = (<HTMLInputElement>document.getElementById('txtLegajo')).value;
        let sueldo :string = (<HTMLInputElement>document.getElementById('txtSueldo')).value;
        let turno :string = ObtenerTurnoSeleccionadoBD();
        let foto :any = (<HTMLInputElement>document.getElementById('fileFoto'));
    
        let parametros = new FormData();
    
        parametros.append('txtDni', dni);
        parametros.append('txtNombre', nombre);
        parametros.append('txtApellido', apellido);
        parametros.append('cboSexo', sexo);
        parametros.append('txtLegajo', legajo);
        parametros.append('txtSueldo', sueldo);
        parametros.append('rdoTurno', turno);
        parametros.append('fileFoto', foto.files[0]);
    
        let ajaxAlta = new XMLHttpRequest();
        ajaxAlta.open('POST', './administracion_bd.php');
        ajaxAlta.setRequestHeader("enctype","multipart/form-data");
        ajaxAlta.send(parametros);
        ajaxAlta.onreadystatechange = () =>{
            if(ajaxAlta.readyState == 4 && ajaxAlta.status == 200){
                console.clear();
                console.log(ajaxAlta.responseText);
                ActualizarPaginaBD();
            }
        }
    }
}

function ModificarUsuarioBD(dni:string){
    let ajaxModificar = new Ajax();
    let parametro = `hiddenModificar=${dni}`;
    ajaxModificar.Post('./index_bd.php',
    (respuesta:string)=>{
        console.log(respuesta);
        let formulario = (<HTMLInputElement>document.getElementById('formularioEmpleado'));
        formulario.innerHTML = respuesta;
    },
    parametro);
}

function ModificarBD(){
    if(AdministrarValidacionesBD()){
        let dni :string = (<HTMLInputElement>document.getElementById('txtDni')).value;
        let apellido :string = (<HTMLInputElement>document.getElementById('txtApellido')).value;
        let nombre :string = (<HTMLInputElement>document.getElementById('txtNombre')).value;
        let sexo :string = (<HTMLInputElement>document.getElementById('cboSexo')).value;
        let legajo :string = (<HTMLInputElement>document.getElementById('txtLegajo')).value;
        let sueldo :string = (<HTMLInputElement>document.getElementById('txtSueldo')).value;
        let turno :string = ObtenerTurnoSeleccionadoBD();
        let foto :any = (<HTMLInputElement>document.getElementById('fileFoto'));
    
        let parametros = new FormData();
    
        parametros.append('txtDni', dni);
        parametros.append('txtNombre', nombre);
        parametros.append('txtApellido', apellido);
        parametros.append('cboSexo', sexo);
        parametros.append('txtLegajo', legajo);
        parametros.append('txtSueldo', sueldo);
        parametros.append('rdoTurno', turno);
        parametros.append('fileFoto', foto.files[0]);
        parametros.append('hiddenModificar', 'TRUE');

        let ajaxModif = new XMLHttpRequest();
        ajaxModif.open('POST', './administracion_bd.php');
        ajaxModif.setRequestHeader("enctype","multipart/form-data");
        ajaxModif.send(parametros);
        ajaxModif.onreadystatechange = () =>{
            if(ajaxModif.readyState == 4 && ajaxModif.status == 200){
                console.clear();
                console.log(ajaxModif.responseText);
                ActualizarPaginaBD();
            }
        }
    }
}