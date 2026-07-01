package com.travelpoint.controller;

import com.travelpoint.service.CheckpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CheckpointController {
    @Autowired
    private CheckpointService service;

    @GetMapping("/checkpoints")
    public String listar(Model model) {
        model.addAttribute("lista", service.listarTodos());
        return "index"; // Esto buscará tu archivo index.html en /templates
    }
}