package com.travelpoint.model;

public class Checkpoint {
    private int id;
    private String lugar;
    private String vehiculo;
    private String observaciones;

    // Constructores, Getters y Setters
    public Checkpoint() {}

    public Checkpoint(int id, String lugar, String vehiculo, String observaciones) {
        this.id = id;
        this.lugar = lugar;
        this.vehiculo = vehiculo;
        this.observaciones = observaciones;
    }

    // (Generar Getters y Setters aquí)
}