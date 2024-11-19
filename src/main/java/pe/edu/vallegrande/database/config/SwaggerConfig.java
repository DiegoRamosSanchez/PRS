package pe.edu.vallegrande.database.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        // Establece la URL directamente
        String serverUrl = "https://verbose-goggles-x5v9wq96wxq9h6qv5-8080.app.github.dev";

        return new OpenAPI()
            .info(new Info()
                .title("Tu API")
                .version("1.0")
                .description("Documentación de la API"))
            .servers(List.of(new Server().url(serverUrl)));
    }
}
