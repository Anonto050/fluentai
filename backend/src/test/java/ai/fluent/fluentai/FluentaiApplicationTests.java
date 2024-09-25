package ai.fluent.fluentai;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FluentaiApplicationTests {

	@Test
	void contextLoads() {

		// print environment variables
		System.out.println("Environment variables:");
		System.getenv().forEach((k, v) -> System.out.println(k + ": " + v));
	}

}
