package ai.fluent.fluentai.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.junit.jupiter.api.BeforeEach;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

import ai.fluent.fluentai.Language.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @BeforeEach
    void setUp() {
        Language language = new Language();
        language.setId(1);
        language.setName("English");
        languageRepository.save(language);

        User user = new User();
        user.setId(1);
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        user.setName("John Doe");
        user.setPhotoUrl("url");
        user.setNativeLang(language);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Test
    void testCreateUser() {
        Language language = new Language();
        language.setId(1);
        language.setName("English");

        languageRepository.save(language);
        UserDTO userDTO = new UserDTO(2, "john_doe", "john@example.com", "John Doe", "url", 1);

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<UserDTO> request = new HttpEntity<>(userDTO, headers);

        ResponseEntity<User> response = restTemplate.exchange("/v1/users", HttpMethod.POST, request, User.class);

        assertEquals(201, response.getStatusCode().value());
        assertEquals("john_doe", response.getBody().getUsername());
    }

    @Test
    void testGetAllUsers() {
        ResponseEntity<User[]> response = restTemplate.getForEntity("/v1/users", User[].class);

        assertEquals(200, response.getStatusCode().value());
    }

    @Test
    void testUpdateUser() {

        UserDTO userDTO = new UserDTO(null, "john_doe_updated", "john_updated@example.com", "John Doe",
                "url", 1);

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<UserDTO> request = new HttpEntity<>(userDTO, headers);

        ResponseEntity<User> response = restTemplate.exchange("/v1/users/1", HttpMethod.PUT, request, User.class);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("john_doe_updated", response.getBody().getUsername());
    }

    @Test
    void testDeleteUser() {
        ResponseEntity<Void> response = restTemplate.exchange("/v1/users/1", HttpMethod.DELETE, null, Void.class);

        assertEquals(204, response.getStatusCode().value());
    }
}
