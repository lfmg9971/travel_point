package com.travelpoint.model;

public class Checkpoint {
    private int id;
    private String lugar;
    private String vehiculo;
    private String observaciones;

    public Checkpoint() {}

    public Checkpoint(int id, String lugar, String vehiculo, String observaciones) {
        this.id = id;
        this.lugar = lugar;
        this.vehiculo = vehiculo;
        this.observaciones = observaciones;
    }

    // Getters y Setters necesarios para JSP y Servlet
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }
    public String getVehiculo() { return vehiculo; }
    public void setVehiculo(String vehiculo) { this.vehiculo = vehiculo; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}