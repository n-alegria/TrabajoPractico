<?php

require_once "empleado.php";
require_once "interfaces.php";
require_once "./AccesoDatos.php";

class Fabrica implements IArchivo{
    # Atributos
    private $cantidadMaxima;
    public $empleados;
    private $razonSocial;

    # Constructor
    public function __construct($razonSocial, $cantidadMaxima = 5)
    {
        $this->cantidadMaxima = $cantidadMaxima;
        $this->empleados = array();
        $this->razonSocial = $razonSocial;
    }

    # Metodos
    public function AgregarEmpleado($emp){
        $retorno = false;
        if(count($this->empleados) < $this->cantidadMaxima){
            array_push($this->empleados, $emp);
            $this->EliminarEmpleadosRepetidos();
            $retorno = true;
        }
        return $retorno;
    }

    public function CalcularSueldos(){
        $totalSueldos = 0;
        foreach ($this->empleados as $empleado) {
            $totalSueldos += $empleado->GetSueldo();
        }
        return $totalSueldos;
    }

    public function EliminarEmpleado($emp){
       $index = array_search($emp, $this->GetEmpleados());
       if($index !== false){
           unset($this->empleados[$index]);
           return true;
       }
       return false;
    }

    private function EliminarEmpleadosRepetidos(){
        $this->empleados = array_unique($this->empleados, SORT_REGULAR);
    }

    public function ToString(){
        $retorno = "Fabrica: $this->razonSocial<br/>";
        $retorno .= "Cantidad de empleados: " . count($this->empleados) . "<br/><br/>";
        $retorno .= "Lista de empleados:<br/>";
        foreach ($this->empleados as $empleado) {
            $retorno .= $empleado->ToString() . "<br/>";
        }
        $retorno .= "<br/>";
        return $retorno;
    }

    public function GetEmpleados(){
        return $this->empleados;
    }

    # Implementacion Interfaz
    public function TraerDeArchivo($nombreArchivo)
    {   
        $archivo = fopen($nombreArchivo, "r");
        while(!feof($archivo)){
            // 'trim()' -> elimina espacios en blanco al inicio y final de la cadena
            $unEmpleado = trim(fgets($archivo));
            // Si lo que obtengo con 'fgets()' es mayor a cero...
            if(strlen($unEmpleado) > 0){
                // Con 'explode()' divido una cadena de acuerdo a un separador pasado por parametro, retorna un array
                $arrayEmpleado = explode(" - ", $unEmpleado);
                // Creo un nuevo empleado y lo agrego a la fabrica
                $nuevoEmpleado = new Empleado($arrayEmpleado[0], $arrayEmpleado[1], $arrayEmpleado[2], $arrayEmpleado[3],$arrayEmpleado[4], $arrayEmpleado[5], $arrayEmpleado[6]);
                $nuevoEmpleado->SetPathFoto($arrayEmpleado[7]);
                $this->AgregarEmpleado($nuevoEmpleado);
            }
        }
        // Cierro el archivo
        fclose($archivo);
    }

    public function GuardarEnArchivo($nombreArchivo)
    {
        // Abro el archivo
        $archivo = fopen($nombreArchivo, "w+");
        // Recorro el array de empleados y los obtengo individualmente
        foreach ($this->empleados as $empleado) {
            // Utilizo 'fwrite()' para escribirlos en el archivo
            $cadena = $empleado->ToString() . "\r\n";
            fwrite($archivo, $cadena);
        }
        // Cierro el archivo
        fclose($archivo);
    }

    public static function ListadoPDF(){
        $listado = array();
        $pdo = AccesoDatos::DameUnObjetoAcceso();
        $cursor = $pdo->RetornarConsulta('SELECT * FROM empleados');
        $cursor->execute();
        if($cursor->rowCount()){
            while($user = $cursor->fetch(PDO::FETCH_OBJ)){
                $userAux = new Empleado($user->nombre, $user->apellido, $user->dni, $user->sexo, $user->legajo, $user->sueldo, $user->turno);
                array_push($listado, $userAux);
            }
        }
        return $listado;
    }
}

?>