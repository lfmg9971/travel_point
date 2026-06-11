<div class="travel-list">
    <% 
        List<Checkpoint> lista = (List<Checkpoint>) request.getAttribute("viajes");
        if(lista != null) {
            for(Checkpoint cp : lista) {
    %>
        <article class="travel-card">
            <div class="travel-info">
                <h3><%= cp.getLugar() %></h3>
                <p>Vehículo: <%= cp.getVehiculo() %></p>
            </div>
        </article>
    <%      } 
        } 
    %>
</div>