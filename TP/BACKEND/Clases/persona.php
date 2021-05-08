<?php

abstract class Persona
{
    # Atributos
    private $apellido;
    private $dni;
    private $nombre;
    private $sexo;

    # Constructor
    public function __construct($nombre, $apellido, $dni, $sexo)
    {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->dni = $dni;
        $this->sexo = $sexo;
    }

    # Funciones como Propiedades
    public function GetApellido(){
        return $this->apellido;
    }

    public function GetDni(){
        return $this->dni;
    }

    public function GetNombre(){
        return $this->nombre;
    }

    public function GetSexo(){
        return $this->sexo;
    }

    # Metodos
    public abstract function Hablar($idioma);

    public function ToString(){
        # dni - nombre - apellido - sexo
        return $this->GetDni() . " - " . ucfirst($this->GetNombre()) . " - " . ucfirst($this->GetApellido()) . " - " . $this->GetSexo();
    }
}
?>