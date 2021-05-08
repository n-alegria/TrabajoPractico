<?php
require_once "persona.php";

class Empleado extends Persona{
    # Atributos
    protected $legajo;
    protected $sueldo;
    protected $turno;
    protected $pathFoto;

    # Constructor
    public function __construct($nombre, $apellido, $dni, $sexo, $legajo, $sueldo, $turno){
        parent::__construct($nombre, $apellido, $dni, $sexo);
        $this->legajo = $legajo;
        $this->sueldo = $sueldo;
        $this->turno = $turno;
    }

    # Funciones como Propiedades
    public function GetLegajo(){
        return $this->legajo;
    }

    public function GetSueldo(){
        return $this->sueldo;
    }

    public function GetTurno(){
        return $this->turno;
    }

    public function SetPathFoto($foto){
        $this->pathFoto= $foto;
    }

    public function GetPathFoto(){
         return $this->pathFoto;
    }

    # Metodos
    public function Hablar($idiomas)
    {
        $idiomasCapitalizados = [];
        foreach($idiomas as $idioma){
            array_push($idiomasCapitalizados, ucfirst($idioma));
        }
        $idiomasCapitalizados = implode(", ", $idiomasCapitalizados);
        return "El empleado habla " . $idiomasCapitalizados;
    }

    public function ToString()
    {
        ## dni - nombre - apellido - sexo - legajo - turno - pathFoto
        return parent::ToString(). " - " . $this->GetLegajo() . " - " . $this->GetSueldo() . " - " . $this->GetTurno() . " - " . $this->GetPathFoto();
    }
}


?>