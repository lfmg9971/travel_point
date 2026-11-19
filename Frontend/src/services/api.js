const API_URL = 'http://localhost/Backend-PHP';

// ================= USUARIOS = =================

export const loginUsuario = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/usuarios.php?accion=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};
// Alias para que funcione tanto loginUsuario como loginUser
export const loginUser = loginUsuario;

export const registrarUsuario = async (nombre, email, password) => {
  try {
    const response = await fetch(`${API_URL}/usuarios.php?accion=registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });
    return await response.json();
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};
export const registerUser = registrarUsuario;

// ================= CHECKPOINTS / VIAJES = =================

export const getCheckpoints = async () => {
  try {
    const response = await fetch(`${API_URL}/checkpoints.php`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    return [];
  }
};
export const obtenerCheckpoints = getCheckpoints;

export const createCheckpoint = async (checkpointData) => {
  try {
    const response = await fetch(`${API_URL}/checkpoints.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkpointData)
    });
    
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Respuesta no válida del servidor:", text);
      throw new Error("El servidor respondió con un formato no válido.");
    }
  } catch (error) {
    console.error("Error al crear checkpoint:", error);
    throw error;
  }
};
export const crearCheckpoint = createCheckpoint;

export const deleteCheckpoint = async (id) => {
  try {
    const response = await fetch(`${API_URL}/checkpoints.php?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    throw error;
  }
};
export const eliminarCheckpoint = deleteCheckpoint;