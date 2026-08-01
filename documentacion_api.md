# Documentación de Servicios Web - Travel Point
**Proyecto Formativo:** Aplicación para registro de puntos de control (check points) y rutas de viajes.

## Endpoints Desarrollados

### 1. Registro de Usuario
* **Ruta:** `/api/registro`
* **Método:** `POST`
* **Descripción:** Permite registrar un nuevo usuario en el sistema.
* **Body requerido (JSON):** `{"usuario": "string", "contraseña": "string"}`

### 2. Inicio de Sesión
* **Ruta:** `/api/login`
* **Método:** `POST`
* **Descripción:** Autentica las credenciales del usuario.
* **Body requerido (JSON):** `{"usuario": "string", "contraseña": "string"}`

### 3. Registrar un Punto de Viaje (Check Point)
* **Ruta:** `/api/viajes`
* **Método:** `POST`
* **Descripción:** Guarda un nuevo punto de parada o lugar visitado en las rutas de viaje.
* **Body requerido (JSON):** `{"lugar": "string", "descripcion": "string", "coordenadas": "string"}`

### 4. Consultar Viajes Registrados
* **Ruta:** `/api/viajes`
* **Método:** `GET`
* **Descripción:** Retorna la lista de todos los check points almacenados.