package ai.fluent.fluentai.UserProgress;

import ai.fluent.fluentai.User.*;
import ai.fluent.fluentai.Course.*;
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
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<UserProgress> createUserProgress(UserProgressDTO userProgressDTO) {
        Optional<User> userOptional = userRepository.findById(userProgressDTO.getUserId());
        Optional<Course> activeCourseOptional = courseRepository.findById(userProgressDTO.getActiveCourseId());
        if (userOptional.isPresent() && activeCourseOptional.isPresent()) {
            User user = userOptional.get();
            Course activeCourse = activeCourseOptional.get();
            UserProgress userProgress = new UserProgress(user, activeCourse, userProgressDTO.getHearts(),
                    userProgressDTO.getPoints());
            return Optional.of(userProgressRepository.save(userProgress));
        }
        return Optional.empty();
    }

    public Optional<UserProgress> updateUserProgress(int id, UserProgressDTO userProgressDTO) {
        return userProgressRepository.findById(id).map(userProgress -> {
            Optional<User> userOptional = userRepository.findById(userProgressDTO.getUserId());
            Optional<Course> activeCourseOptional = courseRepository.findById(userProgressDTO.getActiveCourseId());

            if (userOptional.isPresent() && activeCourseOptional.isPresent()) {
                User user = userOptional.get();
                Course activeCourse = activeCourseOptional.get();
                userProgress.setUser(user);
                userProgress.setActiveCourse(activeCourse);
            }
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

    public List<UserProgress> getTopUsers(int limit) {
        return userProgressRepository.findTopUsers(PageRequest.of(0, limit));
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
