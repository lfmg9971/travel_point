const BASE_URL = 'http://192.168.1.58/Backend-PHP';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios.php?accion=login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en la petición de login:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios.php?accion=registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en la petición de registro:', error);
    throw error;
  }
};

export const getCheckpoints = async () => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios.php`);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener puntos:', error);
    return [];
  }
};