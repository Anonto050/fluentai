package ai.fluent.fluentai.UserProgress;

import ai.fluent.fluentai.User.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class UserProgressService {

    @Autowired
    private UserProgressRepository userProgressRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<UserProgress> createUserProgress(UserProgressDTO userProgressDTO) {
        Optional<User> userOptional = userRepository.findById(userProgressDTO.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserProgress userProgress = new UserProgress(user, userProgressDTO.getHearts(),
                    userProgressDTO.getPoints());
            return Optional.of(userProgressRepository.save(userProgress));
        }
        return Optional.empty();
    }

    public Optional<UserProgress> updateUserProgress(int id, UserProgressDTO userProgressDTO) {
        return userProgressRepository.findById(id).map(userProgress -> {
            userProgress.setHearts(userProgressDTO.getHearts());
            userProgress.setPoints(userProgressDTO.getPoints());
            return userProgressRepository.save(userProgress);
        });
    }

    public List<UserProgress> getAllUserProgress() {
        return userProgressRepository.findAll();
    }

    public List<UserProgress> getAllUserProgress(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userProgressRepository.findAll(pageable).getContent();
    }

    public long countUserProgress() {
        return userProgressRepository.count();
    }

    public Optional<UserProgress> getUserProgressById(int id) {
        return userProgressRepository.findById(id);
    }

    public boolean deleteUserProgress(int id) {
        if (userProgressRepository.existsById(id)) {
            userProgressRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
