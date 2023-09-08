<?php

namespace Model;

class Mapa extends ActiveRecord
{
    protected static $tabla = 'mapas';
    protected static $columnasDB = ['mapa_nombre', 'mapa_latitud', 'mapa_longitud', 'mapa_situacion'];
    protected static $idTabla = 'mapa_id';

    public $mapa_id;
    public $mapa_nombre;
    public $mapa_latitud;
    public $mapa_longitud;
    public $mapa_situacion;

    public function __construct($args = [])
    {
        $this->mapa_id = $args['mapa_id'] ?? null;
        $this->mapa_nombre = $args['mapa_nombre'] ?? '';
        $this->mapa_latitud = $args['mapa_latitud'] ?? '';
        $this->mapa_longitud = $args['mapa_longitud'] ?? '';
        $this->mapa_situacion = $args['mapa_situacion'] ?? 1;
    }

}