package com.travelpoint.entity;

import jakarta.persistence.*;

/**
 * Entidad que representa un punto de control o lugar visitado en un viaje.
 * Mapea directamente a la tabla 'checkpoints' en la base de datos.
 */
@Entity
@Table(name = "checkpoints")
public class Checkpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String lugar;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private String coordenadas;

    // Constructor vacío requerido por Spring/JPA
    public Checkpoint() {}

    // Constructor con parámetros
    public Checkpoint(String lugar, String descripcion, String coordenadas) {
        this.lugar = lugar;
        this.descripcion = descripcion;
        this.coordenadas = coordenadas;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getCoordenadas() { return coordenadas; }
    public void setCoordenadas(String coordenadas) { this.coordenadas = coordenadas; }
}