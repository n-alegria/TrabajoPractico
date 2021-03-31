function AdministrarValidaciones(){
    let dni:number = parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
    let legajo:number = parseInt((<HTMLInputElement>document.getElementById("txtLegajo")).value);
    let sueldo:number = parseInt((<HTMLInputElement>document.getElementById("txtSueldo")).value);
    let turno:string = ObtenerTurnoSeleccionado();

    let retorno : boolean = true;
    
    // Validar campos vacios
    if((!ValidarCamposVacios("txtDni")) || (!ValidarCamposVacios("txtApellido")) || (!ValidarCamposVacios("txtNombre")) || !ValidarCamposVacios("txtLegajo") || !ValidarCamposVacios("txtSueldo")){
        retorno = false;
        alert("No se permiten campos vacios");
        console.log("Un campo del formulario se encuentra vacio");
    }

    // Validacion campo vacio y rango "txtDni"
    if(!(ValidarRangoNumerico(dni, 1000000, 55000000))){
        retorno = false;
        if(dni < 1000000)
            alert("EL numero es inferior a 1000000");
        else
            alert("El numero es superior a 55000000");
        console.log("Error en DNI");
    }
    
    // Validacion "cboSexo"
    if(!ValidarCombo("cboSexo", "---")){
        retorno = false;
        console.log("Error en Sexo");
    }
    
    // Validacion rango "txtLegajo"
    if(!ValidarRangoNumerico(legajo, 100, 500)){
        retorno = false;
        if(legajo < 100)
            alert("EL numero es inferior a 100");
        else
            alert("El numero es superior a 500");
        console.log("Error en Legajo");
    }

    // Validacion rango "txtSueldo"
    if(!ValidarRangoNumerico(sueldo, 8000, 25000)){
        retorno = false;
        console.log("Error en sueldo");
        if(sueldo < 8500)
            alert("EL numero es inferior a 8500");
        else
            alert("El numero es superior a 25000");
    }
    
    // Validacion sueldo segun turno
    if(sueldo > ObtenerSueldoMaximo(turno)){
        retorno = false;
        console.log("Error en Sueldo");
        alert("El sueldo ingresado no es valido de acuerdo al Turno");
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
