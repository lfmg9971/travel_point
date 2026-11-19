package com.travelpoint.runners;
import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;
@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
    features = "src/test/resources/features/gestion_checkpoints.feature",
    glue = "com.travelpoint.stepdefinitions",
    snippets = CucumberOptions.SnippetType.CAMELCASE,
    tags = "@TravelPoint"
)
public class CheckpointsRunner {
}
