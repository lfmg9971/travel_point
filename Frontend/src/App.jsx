import { useState, useEffect } from 'react';
import PlayerStats from './components/PlayerStats';

function App() {
  const [vista, setVista] = useState('ver');
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    lugar: '',
    coordenadas: '4.6097, -74.0817',
    latitud: '4.6097',
    longitud: '-74.0817'
  });

  // Carga de datos al montar el componente
  useEffect(() => {
    let activo = true;

    fetch('http://localhost:8000/checkpoints.php')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con el servidor PHP');
        return res.json();
      })
      .then(data => {
        if (activo) {
          setCheckpoints(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (activo) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  // Función para refrescar la lista manualmente después de crear un registro
  const actualizarLista = () => {
    fetch('http://localhost:8000/checkpoints.php')
      .then(res => res.json())
      .then(data => setCheckpoints(data))
      .catch(err => console.error("Error actualizando lista:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/checkpoints.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        alert('📍 ¡Punto de reaparición guardado con éxito!');
        setFormData({
          nombre: '',
          descripcion: '',
          lugar: '',
          coordenadas: '4.6097, -74.0817',
          latitud: '4.6097',
          longitud: '-74.0817'
        });
        actualizarLista();
        setVista('ver');
      })
      .catch(err => alert('Error al guardar: ' + err.message));
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '30px 20px', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Encabezado */}
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#38bdf8', fontSize: '2.5rem', margin: '0 0 5px 0' }}>🎮 Travel Point</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Tu bitácora de viajes gamificada</p>
        </header>

        {/* Panel de Estadísticas del Jugador */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '15px', marginBottom: '25px', border: '1px solid #334155' }}>
          <PlayerStats />
        </div>

        {/* Menú de Navegación Principal */}
        <nav style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <button 
            onClick={() => setVista('ver')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: vista === 'ver' ? '#0284c7' : '#334155',
              color: '#ffffff',
              transition: 'all 0.3s ease'
            }}
          >
            🗺️ Mis Viajes Guardados
          </button>
          <button 
            onClick={() => setVista('agregar')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: vista === 'agregar' ? '#0284c7' : '#334155',
              color: '#ffffff',
              transition: 'all 0.3s ease'
            }}
          >
            ➕ Nuevo Punto de Reaparición
          </button>
        </nav>

        {/* Secciones Dinámicas */}
        <main>
          {vista === 'ver' ? (
            <div>
              <h2 style={{ color: '#38bdf8', borderBottom: '2px solid #334155', paddingBottom: '8px' }}>
                📍 Puntos Registrados
              </h2>
              {loading && <p style={{ color: '#fbbf24' }}>Cargando datos desde el servidor...</p>}
              {error && <p style={{ color: '#f87171' }}>{error}</p>}
              {!loading && !error && (
                <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                  {checkpoints.map(item => (
                    <div key={item.id} style={{
                      backgroundColor: '#1e293b',
                      borderLeft: '5px solid #38bdf8',
                      borderRadius: '8px',
                      padding: '15px 20px',
                      color: '#f8fafc'
                    }}>
                      <h3 style={{ margin: '0 0 8px 0', color: '#38bdf8' }}>{item.nombre}</h3>
                      <p style={{ margin: '4px 0', color: '#cbd5e1' }}><strong>Lugar:</strong> {item.lugar}</p>
                      <p style={{ margin: '4px 0', color: '#cbd5e1' }}><strong>Descripción:</strong> {item.descripcion}</p>
                      <p style={{ margin: '4px 0', color: '#64748b', fontSize: '0.9rem' }}><strong>Coordenadas:</strong> {item.coordenadas}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
              <h2 style={{ color: '#38bdf8', marginTop: 0 }}>📍 Registrar Nuevo Viaje</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>Nombre del Checkpoint:</label>
                  <input 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder="Ej. Páramo de Sumapaz"
                    required 
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>Ubicación / Lugar:</label>
                  <input 
                    type="text" 
                    name="lugar" 
                    value={formData.lugar} 
                    onChange={handleChange} 
                    placeholder="Ej. Cundinamarca, Colombia"
                    required 
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>Descripción de la Rodada:</label>
                  <textarea 
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                    placeholder="Detalles del trayecto..."
                    required 
                    rows="3"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
                  />
                </div>
                <button 
                  type="submit" 
                  style={{ padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                >
                  Guardar Punto de Reaparición
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;