function AdministrarValidaciones(){
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

    return retorno;
    
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

function AdministrarValidacionesLogin(){
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

    return VerificarValidacionesLogin();
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