package ai.fluent.fluentai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FluentaiApplication {

	public static void main(String[] args) {
		// Check and print specific environment variables
		String dbUrl = System.getenv("DB_URL");
		String dbUser = System.getenv("DB_USER");
		String dbPassword = System.getenv("DB_PASSWORD");

		System.out.println("DB_URL: " + dbUrl);
		System.out.println("DB_USER: " + dbUser);
		System.out.println("DB_PASSWORD: " + (dbPassword != null ? "******" : "Not Set"));

		// Print all environment variables (for debugging purposes)
		System.getenv().forEach((key, value) -> System.out.println(key + ": " + value));
		SpringApplication.run(FluentaiApplication.class, args);
	}

}
