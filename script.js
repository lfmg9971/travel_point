// Función principal para cambiar de pantalla
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    // Reiniciar el scroll al cambiar de pantalla
    target.scrollTop = 0;
  }
}

// Función interactiva de ejemplo para el requisito de JS
function activarLog() {
  alert("¡Punto de reaparición guardado con éxito! 🎮");
  showScreen('historial');
}