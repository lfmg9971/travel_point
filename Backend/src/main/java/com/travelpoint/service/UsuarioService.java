package com.travelpoint.service;

import com.travelpoint.entity.Usuario;
import com.travelpoint.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario guardarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    public List<Usuario> obtenerUsuarios() {
        return repository.findAll();
    }
}