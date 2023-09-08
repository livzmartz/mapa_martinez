<?php

namespace Controllers;

use MVC\Router;
use Model\Mapa;
use Exception;

class MapaController {
    public static function index(Router $router){
        $router->render('mapa/index', []);
    }


    public static function buscarAPI(){
        $mapa_nombre = $_GET['mapa_nombre'] ?? '';
        $sql = "SELECT * FROM mapas WHERE mapa_situacion = '1' ";
    
        if (!empty($mapa_nombre)) {
            $mapa_nombre = strtolower($mapa_nombre);
            $sql .= " AND LOWER(mapa_nombre) LIKE '%$mapa_nombre%' ";
        }
    
        try {
            $mapas = Mapa::fetchArray($sql); 
            echo json_encode($mapas);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }

}