package com.travelpoint.controller;

import com.travelpoint.model.Checkpoint;
import com.travelpoint.repository.CheckpointRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/CheckpointServlet")
public class CheckpointServlet extends HttpServlet {
    
    private CheckpointRepository repository = new CheckpointRepository();

    // MÉTODO GET: Para listar los viajes en la bitácora
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        try {
            List<Checkpoint> lista = repository.listar();
            request.setAttribute("viajes", lista);
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // MÉTODO POST: Para recibir los datos del formulario de registro
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String lugar = request.getParameter("lugar");
        String vehiculo = request.getParameter("vehiculo");
        String observaciones = "Registro desde App Web";

        Checkpoint nuevoCP = new Checkpoint(0, lugar, vehiculo, observaciones);
        
        try {
            repository.insertar(nuevoCP);
            // Después de guardar, volvemos a cargar la lista
            response.sendRedirect("CheckpointServlet"); 
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}