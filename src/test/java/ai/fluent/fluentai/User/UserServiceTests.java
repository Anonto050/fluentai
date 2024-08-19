package ai.fluent.fluentai.User;

import ai.fluent.fluentai.Language.Language;
import ai.fluent.fluentai.Language.LanguageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private LanguageRepository languageRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        User user = new User("john_doe", "john@example.com", "John Doe", "url", null);
        List<User> users = Arrays.asList(user);

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(users, result);
    }

    @Test
    void testGetAllUsers_Paginated() {
        User user = new User("john_doe", "john@example.com", "John Doe", "url", null);
        List<User> users = Arrays.asList(user);

        Pageable pageable = PageRequest.of(0, 10);
        when(userRepository.findAll(pageable)).thenReturn(new PageImpl<>(users));

        List<User> result = userService.getAllUsers(0, 10);

        assertEquals(users, result);
    }

    @Test
    void testCountUsers() {
        when(userRepository.count()).thenReturn(10L);

        int result = userService.countUsers();

        assertEquals(10, result);
    }

    @Test
    void testGetUserById_UserExists() {
        User user = new User("john_doe", "john@example.com", "John Doe", "url", null);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(1);

        assertEquals(Optional.of(user), result);
    }

    @Test
    void testGetUserById_UserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(1);

        assertEquals(Optional.empty(), result);
    }

    @Test
    void testCreateUser() {
        UserDTO userDTO = new UserDTO(1, "john_doe", "john@example.com", "John Doe", "url", 1);
        Language language = new Language("Arabic");
        User user = new User("john_doe", "john@example.com", "John Doe", "url", language);

        when(languageRepository.findById(1)).thenReturn(Optional.of(language));
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userService.createUser(userDTO);

        assertEquals(user, result);
    }

    @Test
    void testUpdateUser_UserExists() {
        UserDTO userDTO = new UserDTO(1, "john_doe", "john@example.com", "John Doe", "url", 1);
        Language language = new Language("Arabic");
        User user = new User("john_doe", "john@example.com", "John Doe", "url", language);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(languageRepository.findById(1)).thenReturn(Optional.of(language));
        when(userRepository.save(any(User.class))).thenReturn(user);

        Optional<User> result = userService.updateUser(1, userDTO);

        assertEquals(Optional.of(user), result);
    }

    @Test
    void testUpdateUser_UserNotFound() {
        UserDTO userDTO = new UserDTO(1, "john_doe", "john@example.com", "John Doe", "url", 1);

        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Optional<User> result = userService.updateUser(1, userDTO);

        assertEquals(Optional.empty(), result);
    }

    @Test
    void testDeleteUser_UserExists() {
        User user = new User("john_doe", "john@example.com", "John Doe", "url", null);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        boolean result = userService.deleteUser(1);

        assertEquals(true, result);
        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void testDeleteUser_UserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        boolean result = userService.deleteUser(1);

        assertEquals(false, result);
        verify(userRepository, times(0)).delete(any(User.class));
    }
}
