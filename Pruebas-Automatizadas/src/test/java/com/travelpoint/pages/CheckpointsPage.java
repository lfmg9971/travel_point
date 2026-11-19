package com.travelpoint.pages;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
public class CheckpointsPage extends PageObject {
    @FindBy(id = "nombre_checkpoint")
    private WebElementFacade txtNombrePunto;
    @FindBy(id = "ruta_asociada")
    private WebElementFacade txtRuta;
    @FindBy(id = "btn_guardar")
    private WebElementFacade btnGuardar;
    @FindBy(className = "alert-success")
    private WebElementFacade lblMensajeExito;
    public void ingresarNombrePunto(String nombre) {
        txtNombrePunto.type(nombre);
    }
    public void ingresarRuta(String ruta) {
        txtRuta.type(ruta);
    }
    public void hacerClicGuardar() {
        btnGuardar.click();
    }
    public String obtenerTextoConfirmacion() {
        return lblMensajeExito.getText();
    }
}
