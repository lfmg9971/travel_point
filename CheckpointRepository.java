package com.travelpoint.repository;

import com.travelpoint.model.Checkpoint;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CheckpointRepository {
    private String url = "jdbc:mysql://localhost:3306/travelpoint_db";
    private String user = "root";
    private String pass = "password";

    // MÉTODO: INSERTAR (Crear)
    public void insertar(Checkpoint cp) throws SQLException {
        String sql = "INSERT INTO checkpoints (lugar, vehiculo, observaciones) VALUES (?, ?, ?)";
        try (Connection con = DriverManager.getConnection(url, user, pass);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, cp.getLugar());
            ps.setString(2, cp.getVehiculo());
            ps.setString(3, cp.getObservaciones());
            ps.executeUpdate();
        }
    }

    // MÉTODO: CONSULTAR (Leer)
    public List<Checkpoint> listar() throws SQLException {
        List<Checkpoint> lista = new ArrayList<>();
        String sql = "SELECT * FROM checkpoints";
        try (Connection con = DriverManager.getConnection(url, user, pass);
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Checkpoint(rs.getInt("id"), rs.getString("lugar"), 
                          rs.getString("vehiculo"), rs.getString("observaciones")));
            }
        }
        return lista;
    }

    // MÉTODO: ACTUALIZAR
    public void actualizar(Checkpoint cp) throws SQLException {
        String sql = "UPDATE checkpoints SET lugar=?, vehiculo=?, observaciones=? WHERE id=?";
        try (Connection con = DriverManager.getConnection(url, user, pass);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, cp.getLugar());
            ps.setString(2, cp.getVehiculo());
            ps.setString(3, cp.getObservaciones());
            ps.setInt(4, cp.getId());
            ps.executeUpdate();
        }
    }

    // MÉTODO: ELIMINAR
    public void eliminar(int id) throws SQLException {
        String sql = "DELETE FROM checkpoints WHERE id=?";
        try (Connection con = DriverManager.getConnection(url, user, pass);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}