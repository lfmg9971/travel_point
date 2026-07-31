/**
 * Rutas y Lógica de Negocio - Travel Point
 */

const express = require('express');
const router = express.Router();

// Bases de datos simuladas en memoria
const usuariosBD = [];
const viajesBD = [];

// ==========================================
// 1. MÓDULO DE AUTENTICACIÓN
// ==========================================

router.post('/registro', (req, res) => {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
        return res.status(400).json({ error: true, mensaje: 'Usuario y contraseña obligatorios.' });
    }
    
    const existe = usuariosBD.find(u => u.usuario === usuario);
    if (existe) {
        return res.status(400).json({ error: true, mensaje: 'El usuario ya existe.' });
    }

    usuariosBD.push({ usuario, contraseña });
    return res.status(201).json({ error: false, mensaje: 'Usuario registrado exitosamente.' });
});

router.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const valido = usuariosBD.find(u => u.usuario === usuario && u.contraseña === contraseña);
    
    if (!valido) {
        return res.status(401).json({ error: true, mensaje: 'Error en la autenticación.' });
    }
    return res.status(200).json({ error: false, mensaje: 'Autenticación satisfactoria.' });
});

// ==========================================
// 2. MÓDULO DE VIAJES / PUNTOS DE CONTROL
// ==========================================

// Registrar un nuevo check point o viaje
router.post('/viajes', (req, res) => {
    const { lugar, descripcion, coordenadas } = req.body;

    if (!lugar) {
        return res.status(400).json({ error: true, mensaje: 'El nombre del lugar es obligatorio.' });
    }

    const nuevoViaje = {
        id: viajesBD.length + 1,
        lugar,
        descripcion: descripcion || '',
        coordenadas: coordenadas || 'Sin coordenadas',
        fecha: new Date().toISOString()
    };

    viajesBD.push(nuevoViaje);
    return res.status(201).json({
        error: false,
        mensaje: 'Punto de viaje registrado con éxito.',
        datos: nuevoViaje
    });
});

// Consultar todos los puntos de viaje guardados
router.get('/viajes', (req, res) => {
    return res.status(200).json({
        error: false,
        total: viajesBD.length,
        viajes: viajesBD
    });
});

module.exports = router;