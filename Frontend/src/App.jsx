import React from 'react';
import PlayerStats from './components/PlayerStats';
import TravelCard from './components/TravelCard';

/**
 * Componente App (Módulo Principal)
 * Actúa como contenedor de la pantalla de inicio de Travel Point.
 */
function App() {
  // Lista simulada de los últimos check points alcanzados
  const recentCheckpoints = [
    { id: 1, title: "Páramo de Sumapaz", date: "15-May-2026", location: "Cundinamarca" },
    { id: 2, title: "Lago de los Tunjos", date: "16-May-2026", location: "Cundinamarca" },
    { id: 3, title: "Cerro de Monserrate", date: "20-May-2026", location: "Bogotá" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <header>
        <h1>🎮 Travel Point</h1>
        <p>Tu bitácora de viajes gamificada</p>
      </header>

      <main>
        {/* Renderiza las estadísticas del jugador */}
        <PlayerStats />

        {/* Renderiza el historial de rutas usando mapeo de arrays */}
        <h2>Últimos Check Points Guardados</h2>
        {recentCheckpoints.map(checkpoint => (
          <TravelCard 
            key={checkpoint.id} 
            title={checkpoint.title} 
            date={checkpoint.date} 
            location={checkpoint.location} 
          />
        ))}
      </main>
    </div>
  );
}

export default App;