

/**
 * Componente PlayerStats
 * Muestra el progreso gamificado del usuario, simulando el HUD de un videojuego.
 * Muestra el nivel actual y los puntos de reaparición (check points) alcanzados.
 */
const PlayerStats = () => {
  // Datos simulados (En el futuro provendrán del backend en Spring Boot)
  const player = {
    username: "Rider_Col",
    level: 8,
    checkpoints: 15,
    xpProgress: "65%" // Porcentaje para el próximo nivel
  };

  return (
    <div style={styles.card}>
      <h2>👤 Jugador: {player.username}</h2>
      <div style={styles.stats}>
        <p><strong>Nivel:</strong> {player.level}</p>
        <p><strong>Check Points:</strong> {player.checkpoints}</p>
      </div>
      
      {/* Barra de experiencia (XP) gamificada */}
      <div style={{ marginTop: '10px' }}>
        <small>Progreso al Nivel {player.level + 1}</small>
        <div style={styles.xpBarContainer}>
          <div style={{ ...styles.xpBarFill, width: player.xpProgress }}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { border: '2px solid #333', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '20px' },
  stats: { display: 'flex', justifyContent: 'space-between' },
  xpBarContainer: { width: '100%', backgroundColor: '#ddd', height: '15px', borderRadius: '10px', overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: '#4CAF50' } // Verde tipo "vida" o "XP"
};

export default PlayerStats;