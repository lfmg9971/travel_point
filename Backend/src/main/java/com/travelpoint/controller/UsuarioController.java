package com.travelpoint.controller;

import com.travelpoint.entity.Usuario;
import com.travelpoint.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/registrar")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return service.guardarUsuario(usuario);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return service.obtenerUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario obtenerUsuarioPorId(@PathVariable Long id) {
        return service.obtenerUsuarios().stream()
            .filter(u -> u.getId().equals(id))
            .findFirst()
            .orElse(null);
}
}