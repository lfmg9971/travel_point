package com.travelpoint.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "checkpoints")
public class Checkpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private String lugar;
    private String coordenadas;
    private String latitud;
    private String longitud;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }

    public String getCoordenadas() { return coordenadas; }
    public void setCoordenadas(String coordenadas) { this.coordenadas = coordenadas; }

    public String getLatitud() { return latitud; }
    public void setLatitud(String latitud) { this.latitud = latitud; }

    public String getLongitud() { return longitud; }
    public void setLongitud(String longitud) { this.longitud = longitud; }
}