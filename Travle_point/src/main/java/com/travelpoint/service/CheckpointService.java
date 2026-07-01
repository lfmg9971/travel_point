package com.travelpoint.service;

import com.travelpoint.model.Checkpoint;
import com.travelpoint.repository.CheckpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CheckpointService {
    @Autowired
    private CheckpointRepository repository;

    public List<Checkpoint> listarTodos() {
        return repository.findAll();
    }
}