package com.travelpoint.model;

import jakarta.persistence.*;

@Entity
@Table(name = "checkpoints") // Es buena práctica especificar el nombre de la tabla
public class Checkpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Este es el ID que JPA usará

    private String nombre;
    private String lugar;
    private String vehiculo;
    private String observaciones;

    // Constructor vacío (Obligatorio para JPA)
    public Checkpoint() {}

    // Constructor con parámetros (sin el ID, porque se genera solo)
    public Checkpoint(String nombre, String lugar, String vehiculo, String observaciones) {
        this.nombre = nombre;
        this.lugar = lugar;
        this.vehiculo = vehiculo;
        this.observaciones = observaciones;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }
    
    public String getVehiculo() { return vehiculo; }
    public void setVehiculo(String vehiculo) { this.vehiculo = vehiculo; }
    
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}