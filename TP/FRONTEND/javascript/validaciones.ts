/// <reference path="ajax.ts" />

function AdministrarValidaciones(e : Event){
    let dni:number = parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
    let legajo:number = parseInt((<HTMLInputElement>document.getElementById("txtLegajo")).value);
    let sueldo:number = parseInt((<HTMLInputElement>document.getElementById("txtSueldo")).value);
    let turno:string = ObtenerTurnoSeleccionado();

    let retorno : boolean = true;
    
    // Validacion 'txtDni' -> vacio y rango
    if((!ValidarCamposVacios("txtDni")) || !(ValidarRangoNumerico(dni, 1000000, 55000000))){
        AdministrarSpanError("txtDni", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("txtDni", false);
    }
    
    // Validacion 'txtApellido' -> vacio
    if(!ValidarCamposVacios("txtApellido")){
        AdministrarSpanError("txtApellido", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("txtApellido", false);
    }
    
    // Validacion 'txtNombre' -> vacio
    if(!ValidarCamposVacios("txtNombre")){
        AdministrarSpanError("txtNombre", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("txtNombre", false);
    }
    
    // Validacion "cboSexo"
    if(!ValidarCombo("cboSexo", "---")){
        AdministrarSpanError("cboSexo", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("cboSexo", false);
    }
    
    // Validacion rango "txtLegajo"
    if(!ValidarCamposVacios("txtLegajo") || !ValidarRangoNumerico(legajo, 100, 550)){
        AdministrarSpanError("txtLegajo", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("txtLegajo", false);
    }

    // Validacion rango "txtSueldo"
    if(!ValidarCamposVacios("txtSueldo") || !ValidarRangoNumerico(sueldo, 8000, 25000) || sueldo > ObtenerSueldoMaximo(turno)) {
        AdministrarSpanError("txtSueldo", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("txtSueldo", false);
    }

    // Validacion "fileFoto"
    if(!ValidarCamposVacios("fileFoto")){
        AdministrarSpanError("fileFoto", true);
        retorno = false;
    }
    else{
        AdministrarSpanError("fileFoto", false);
    }
    
    if(!retorno){
        e.preventDefault();
    }
    else{
        ObtenerDatosUsuario();
    }
    
}

function ValidarCamposVacios(idcampo : string) : boolean{
    let retorno : boolean = true;
    let campo : any = (<HTMLInputElement>document.getElementById(idcampo));
    if(campo.value == null || campo.value.length == 0){
        retorno = false;
    }
    return retorno;
}

function ValidarRangoNumerico(campo : number, minimo : number, maximo : number) : boolean{
    let retorno = false;
    if(campo >= minimo && campo <= maximo){
        retorno = true;
    }
    return retorno;
}

function ValidarCombo(idCombo : string, sexoContrario : string) : boolean{
    // Retorna 'true' si NO coincide o 'false' caso contrario
    let retorno : boolean = true;
    let sexo : any = (<HTMLInputElement>document.getElementById(idCombo)).value;
    if(sexo === sexoContrario)
        retorno = false;
    return retorno;
}

function ObtenerTurnoSeleccionado() : string{
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

function ObtenerSueldoMaximo(turnoElegido : string) : number{
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

function AdministrarValidacionesLogin(e : Event){
    let dni : number = parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
    if(!ValidarCamposVacios("txtDni") || !ValidarRangoNumerico(dni, 1000000, 55000000)){
        AdministrarSpanError("txtDni", true);
    }
    else{
        AdministrarSpanError("txtDni", false);
    }
    if(!ValidarCamposVacios("txtApellido")){
        AdministrarSpanError("txtApellido", true);
    }
    else{
        AdministrarSpanError("txtApellido", false);
    }

    if(!VerificarValidacionesLogin()){
        e.preventDefault();
    }
}

function AdministrarSpanError(idcampo : string, mostrar : boolean) : void{
    if(mostrar){
        (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById(idcampo)).nextElementSibling).style.display="block";
    }
    else{
        (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById(idcampo)).nextElementSibling).style.display = "none";
    }
}

function VerificarValidacionesLogin() : boolean{
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

function AdministrarModificar(dniEmpleado : string) : void{
    (<HTMLInputElement>document.getElementById("hiddenModificar")).value = dniEmpleado;
    (<HTMLFormElement>document.getElementById("formModificar")).submit();
}

///////////////////////////////////////////////////////////////////////////
// AJAX
///////////////////////////////////////////////////////////////////////////
window.onload = ():void =>{
    ActualizarPagina();
}

let ActualizarPagina = () =>{
    ActualizarForm();
    MostrarEmpleados();
}

function ActualizarForm(){
    let ajaxForm = new Ajax();
    ajaxForm.Post('./indice.php', (respuesta:string) =>{
        let formulario = (<HTMLInputElement>document.getElementById('formularioEmpleado'));
        formulario.innerHTML = "";
        formulario.innerHTML = respuesta;
    },
    "");
}

function MostrarEmpleados(){
    let ajaxMostrar = new Ajax();
    ajaxMostrar.Post('./mostrar.php', (respuesta:string)=>{
        let mostrar = (<HTMLInputElement>document.getElementById('mostrarEmpleados'));
        mostrar.innerHTML = "";
        mostrar.innerHTML = respuesta;
    },
    "");
}

function EliminarEmpleado(legajo: string){
    let ajax = new Ajax();
    let parametros: string = `legajo=${legajo}`

    ajax.Get("./BACKEND/eliminar.php",
    (respuesta:string)=>{
        console.clear();
        console.log(respuesta);
        MostrarEmpleados();
    },
    parametros,
    );
}

function ObtenerDatosUsuario(){
    let dni :string = (<HTMLInputElement>document.getElementById('txtDni')).value;
    let apellido :string = (<HTMLInputElement>document.getElementById('txtApellido')).value;
    let nombre :string = (<HTMLInputElement>document.getElementById('txtNombre')).value;
    let sexo :string = (<HTMLInputElement>document.getElementById('cboSexo')).value;
    let legajo :string = (<HTMLInputElement>document.getElementById('txtLegajo')).value;
    let sueldo :string = (<HTMLInputElement>document.getElementById('txtSueldo')).value;
    let turno :string = ObtenerTurnoSeleccionado();
    let foto :any = (<HTMLInputElement>document.getElementById('fileFoto'));

    let form = new FormData();

    form.append('txtDni', dni);
    form.append('txtNombre', nombre);
    form.append('txtApellido', apellido);
    form.append('cboSexo', sexo);
    form.append('txtLegajo', legajo);
    form.append('txtSueldo', sueldo);
    form.append('rdoTurno', turno);
    form.append('fileFoto', foto.files[0]);

    let ajaxModificar = new XMLHttpRequest();

    ajaxModificar.open("POST", './BACKEND/administracion.php');
    ajaxModificar.setRequestHeader("enctype","multipart/form-data");
    ajaxModificar.send(form);
    ajaxModificar.onreadystatechange = () =>{
        if(ajaxModificar.status == 200 && ajaxModificar.readyState == 4){
            console.log(ajaxModificar.responseText);
        }
    }
}

