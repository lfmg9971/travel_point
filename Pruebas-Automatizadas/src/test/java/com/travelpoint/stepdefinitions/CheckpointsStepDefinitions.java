package com.travelpoint.stepdefinitions;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Entonces;
import io.cucumber.java.es.Y;
import net.thucydides.core.annotations.Steps;
import com.travelpoint.steps.TravelPointUserSteps;
public class CheckpointsStepDefinitions {
    @Steps
    TravelPointUserSteps usuario;
    @Dado("que el usuario navega a la página de registro de checkpoints de Travel Point")
    public void abrirPaginaTravelPoint() {
        usuario.abrirPaginaWeb();
    }
    @Cuando("el usuario ingresa el nombre del punto {string} y la ruta {string}")
    public void ingresarDatosPunto(String nombrePunto, String ruta) {
        usuario.ingresarFormularioPunto(nombrePunto, ruta);
    }
    @Y("hace clic en el botón guardar")
    public void guardarPunto() {
        usuario.clicEnGuardar();
    }
    @Entonces("el sistema debe almacenar el punto en la base de datos MySQL")
    public void verificarAlmacenamiento() {
        usuario.validarAlmacenamientoExitoso();
    }
    @Y("debe mostrar un mensaje de confirmación con código de respuesta HTTP 200 OK.")
    public void verificarCodigoRespuesta() {
        usuario.validarRespuestaHTTP200();
    }
}
