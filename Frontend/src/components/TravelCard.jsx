import React from 'react';

/**
 * Componente TravelCard
 * Renderiza la información de un "check point" específico alcanzado por el usuario.
 * @param {Object} props - Recibe los datos del viaje (título, fecha, ubicación).
 */
const TravelCard = ({ title, date, location }) => {
  return (
    <div style={styles.card}>
      <h3>📍 {title}</h3>
      <p><strong>Fecha de reaparición:</strong> {date}</p>
      <p><strong>Ubicación:</strong> {location}</p>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px', backgroundColor: '#fff' }
};

export default TravelCard;