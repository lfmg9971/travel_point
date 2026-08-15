package com.travelpoint.controller;

import com.travelpoint.entity.Checkpoint;
import com.travelpoint.service.CheckpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST que gestiona las peticiones HTTP (GET, POST, DELETE) 
 * para el registro y consulta de las rutas de viaje marcadas en el mapa.
 */
@RestController
@RequestMapping("/api/viajes")
public class CheckpointController {

    @Autowired
    private CheckpointService service;

    /**
     * Endpoint para registrar un nuevo viaje.
     * Método POST: /api/viajes
     */
    @PostMapping
    public Checkpoint registrarViaje(@RequestBody Checkpoint checkpoint) {
        return service.guardarPunto(checkpoint);
    }

    /**
     * Endpoint para obtener todos los viajes almacenados.
     * Método GET: /api/viajes
     */
    @GetMapping
    public List<Checkpoint> listarViajes() {
        return service.obtenerTodos();
    }

    /**
     * Endpoint para eliminar un viaje por su ID.
     * Método DELETE: /api/viajes/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarViaje(@PathVariable Long id) {
        boolean eliminado = service.eliminarPunto(id);
        if (eliminado) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content si se borró con éxito
        }
        return ResponseEntity.notFound().build(); // Retorna 404 si el ID no existe
    }
}