package ai.fluent.fluentai.User;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        User user = new User("john_doe", "john@example.com", "John Doe", "url", null);
        List<User> users = Arrays.asList(user);

        when(userService.getAllUsers(0, 10)).thenReturn(users);
        when(userService.countUsers()).thenReturn(1);

        ResponseEntity<List<User>> response = userController.getAllUsers(0, 10);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());

        HttpHeaders headers = response.getHeaders();
        assertEquals("users 0-0/1", headers.getFirst("Content-Range"));
    }

    @Test
    void testGetUserById_UserExists() {
        User user = new User("john_doe", "john@example.com", "John Doe", "url", null);

        when(userService.getUserById(1)).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.getUserById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testGetUserById_UserNotFound() {
        when(userService.getUserById(1)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserById(1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void testCreateUser() {
        UserDTO userDTO = new UserDTO(1, "john_doe", "john@example.com", "John Doe", "url", 1);
        User createdUser = new User("john_doe", "john@example.com", "John Doe", "url", null);

        when(userService.createUser(userDTO)).thenReturn(createdUser);

        ResponseEntity<User> response = userController.createUser(userDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdUser, response.getBody());
    }

    @Test
    void testUpdateUser_UserExists() {
        UserDTO userDTO = new UserDTO(1, "john_doe", "john@example.com", "John Doe", "url", 1);
        User updatedUser = new User("john_doe", "john@example.com", "John Doe", "url", null);

        when(userService.updateUser(1, userDTO)).thenReturn(Optional.of(updatedUser));

        ResponseEntity<User> response = userController.updateUser(1, userDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
    }

    @Test
    void testUpdateUser_UserNotFound() {
        UserDTO userDTO = new UserDTO(1, "john_doe", "john@example.com", "John Doe", "url", 1);

        when(userService.updateUser(1, userDTO)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.updateUser(1, userDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void testDeleteUser_UserExists() {
        when(userService.deleteUser(1)).thenReturn(true);

        ResponseEntity<Void> response = userController.deleteUser(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testDeleteUser_UserNotFound() {
        when(userService.deleteUser(1)).thenReturn(false);

        ResponseEntity<Void> response = userController.deleteUser(1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
