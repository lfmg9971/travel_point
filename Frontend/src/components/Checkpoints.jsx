import { useEffect, useState } from 'react';

const Checkpoints = () => {
    const [checkpoints, setCheckpoints] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Consumo real de la API PHP desde React
        fetch('http://localhost:8000/checkpoints.php')
            .then(res => {
                if (!res.ok) throw new Error('Error en la respuesta de la red');
                return res.json();
            })
            .then(data => setCheckpoints(data))
            .catch(err => setError(err.message));
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>📍 Travel Point - Módulos Integrados</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
                {checkpoints.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{item.nombre}</h3>
                        <p><strong>Descripción:</strong> {item.descripcion}</p>
                        <p><strong>Lugar:</strong> {item.lugar}</p>
                        <p><strong>Coordenadas:</strong> {item.coordenadas}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checkpoints;