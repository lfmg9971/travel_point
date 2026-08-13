/**
 * Servidor Principal - Travel Point (Proyecto Formativo)
 * Evidencia: GA7-220501096-AA5-EV03
 */

const express = require('express');
const travelRoutes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Rutas de la API
app.use('/api', travelRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Travel Point funcionando correctamente.' });
});

app.listen(PORT, () => {
    console.log(`Servidor de Travel Point corriendo en el puerto ${PORT}`);
});