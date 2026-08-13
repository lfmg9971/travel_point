package com.travelpoint.service;

import com.travelpoint.entity.Checkpoint;
import com.travelpoint.repository.CheckpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Servicio que contiene la lógica de negocio para los puntos de viaje.
 * Aplica el patrón de diseño por capas aislando la lógica de base de datos del controlador.
 */
@Service
public class CheckpointService {

    @Autowired
    private CheckpointRepository repository;

    /**
     * Guarda un nuevo punto o lugar visitado en la base de datos.
     * @param checkpoint Objeto con los datos del lugar.
     * @return El objeto guardado con su ID generado.
     */
    public Checkpoint guardarPunto(Checkpoint checkpoint) {
        return repository.save(checkpoint);
    }

    /**
     * Consulta el listado de todos los viajes registrados.
     * @return Lista de puntos de control.
     */
    public List<Checkpoint> obtenerTodos() {
        return repository.findAll();
    }
}