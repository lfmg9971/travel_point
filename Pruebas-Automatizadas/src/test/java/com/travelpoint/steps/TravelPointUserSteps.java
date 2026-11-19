package com.travelpoint.steps;

import net.thucydides.core.annotations.Step;

public class TravelPointUserSteps {

    @Step("Abrir página web")
    public void abrirPaginaWeb() {
        // Lógica para abrir página
    }

    @Step("Ingresar formulario del punto")
    public void ingresarFormularioPunto(String nombrePunto, String ruta) {
        // Lógica para formulario
    }

    @Step("Clic en guardar")
    public void clicEnGuardar() {
        // Lógica para guardar
    }

    @Step("Validar almacenamiento exitoso")
    public void validarAlmacenamientoExitoso() {
        // Lógica para validación
    }

    @Step("Validar respuesta HTTP 200")
    public void validarRespuestaHTTP200() {
        // Lógica para validación HTTP
    }
}