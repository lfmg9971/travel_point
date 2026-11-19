# language: es
@TravelPoint @Checkpoints
Característica: Gestión y registro de puntos de control en Travel Point
  Como usuario de la aplicación Travel Point
  Quiero registrar un nuevo punto de control de viaje
  Para guardar mi historial de rutas recorridas por Colombia.

  @RegistroExitoso
  Escenario: Registro exitoso de un nuevo punto de control en el sistema
    Dado que el usuario navega a la página de registro de checkpoints de Travel Point
    Cuando el usuario ingresa el nombre del punto "Mirador Alto del Vino" y la ruta "Ruta La Vega"
    Y hace clic en el botón guardar
    Entonces el sistema debe almacenar el punto en la base de datos MySQL
    Y debe mostrar un mensaje de confirmación con código de respuesta HTTP 200 OK.