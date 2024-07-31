package ai.fluent.fluentai.Lesson;

import ai.fluent.fluentai.Unit.UnitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {

    @Autowired
    private LessonRepository _lessonRepository;

    @Autowired
    private UnitRepository _unitRepository;

    public List<Lesson> getAllLessons() {
        return _lessonRepository.findAll();
    }

    public Lesson createLesson(Lesson _lesson) {
        // Ensure that the Unit exists before creating a Lesson
        if (_unitRepository.existsById(_lesson.getUnit().getId())) {
            return _lessonRepository.save(_lesson);
        } else {
            throw new IllegalArgumentException("Unit does not exist.");
        }
    }

    public Optional<Lesson> getLessonById(Integer _id) {
        return _lessonRepository.findById(_id);
    }

    public Optional<Lesson> updateLesson(Integer _id, Lesson _lesson) {
        if (_lessonRepository.existsById(_id)) {
            _lesson.setId(_id);
            return Optional.of(_lessonRepository.save(_lesson));
        }
        return Optional.empty();
    }

    public boolean deleteLesson(Integer _id) {
        if (_lessonRepository.existsById(_id)) {
            _lessonRepository.deleteById(_id);
            return true;
        }
        return false;
    }

    public Optional<Integer> getPercentageOfCompletedChallenges(Integer _id) {
        // This method would calculate the percentage of completed challenges
        // Assuming the Challenge entity and its repository exist
        // Placeholder logic, update as needed
        return Optional.of(0); // Replace with actual logic
    }
}
