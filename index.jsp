<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.travelpoint.model.Checkpoint" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Travel Point - Web App</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <div class="phone-frame">
    <div class="app-container">

      <section class="screen active" id="inicio">
        <header class="top-bar">
          <h1>🎮 Travel Point</h1>
          <p class="subtitle">Guía de Usuario</p>
        </header>
        <div class="hero-card">
          <h2>Tutorial de Inicio</h2>
          <ol class="tutorial-list">
            <li><a href="#tema-mapa">Explorar el Radar</a></li>
            <li><a href="#tema-registro">Guardar Checkpoints</a></li>
          </ol>
        </div>
        <div class="menu-buttons">
          <button onclick="showScreen('mapa')">🗺️ Ver mapa</button>
          <button onclick="window.location.href='CheckpointServlet'">📜 Mis viajes</button>
          <button onclick="showScreen('registro')">➕ Nuevo checkpoint</button>
        </div>
      </section>

      <section class="screen" id="registro">
        <header class="top-bar">
          <h1>➕ Nuevo Checkpoint</h1>
        </header>
        <form class="form-card" action="CheckpointServlet" method="POST">
          <label>Lugar visitado</label>
          <input type="text" name="lugar" placeholder="Ej: Guatavita" required />
          <label>Vehículo</label>
          <input type="text" name="vehiculo" placeholder="Tu moto" required />
          <div class="form-buttons">
            <button type="submit" class="save-btn">💾 Guardar en DB</button>
            <button type="button" class="cancel-btn" onclick="showScreen('inicio')">❌ Cancelar</button>
          </div>
        </form>
      </section>

      <section class="screen" id="historial">
        <header class="top-bar">
          <h1>📜 Bitácora Real</h1>
        </header>
        <div class="travel-list">
          <% 
            List<Checkpoint> viajes = (List<Checkpoint>) request.getAttribute("viajes");
            if (viajes != null) {
                for (Checkpoint v : viajes) {
          %>
          <div class="travel-card">
            <div class="travel-thumb">🏍️</div>
            <div class="travel-info">
              <h3><%= v.getLugar() %></h3>
              <p><%= v.getVehiculo() %></p>
            </div>
          </div>
          <% 
                }
            } else { 
          %>
            <p style="text-align:center">Haz clic en "Mis viajes" para cargar datos.</p>
          <% } %>
        </div>
        <div class="menu-buttons">
          <button onclick="showScreen('inicio')">🏠 Inicio</button>
        </div>
      </section>

    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>