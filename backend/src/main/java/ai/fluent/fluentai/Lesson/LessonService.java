package ai.fluent.fluentai.Lesson;

import ai.fluent.fluentai.Unit.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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

    public List<Lesson> getAllLessons(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return _lessonRepository.findAll(pageable).getContent();
    }

    public int getTotalLessons() {
        return (int) _lessonRepository.count();
    }

    public Optional<Lesson> createLesson(LessonDTO _lessonDTO) {
        Optional<Unit> unit = _unitRepository.findById(_lessonDTO.getUnitId());
        if (unit.isPresent()) {
            Lesson lesson = new Lesson();
            lesson.setTitle(_lessonDTO.getTitle());
            lesson.setOrder(_lessonDTO.getOrder());
            lesson.setUnit(unit.get());
            return Optional.of(_lessonRepository.save(lesson));
        }
        return Optional.empty();
    }

    public Optional<Lesson> getLessonById(Integer id) {
        return _lessonRepository.findById(id);
    }

    public Optional<Lesson> updateLesson(Integer id, LessonDTO _lessonDTO) {
        Optional<Lesson> existingLesson = _lessonRepository.findById(id);
        if (existingLesson.isPresent()) {
            Optional<Unit> unit = _unitRepository.findById(_lessonDTO.getUnitId());
            if (unit.isPresent()) {
                Lesson lesson = existingLesson.get();
                lesson.setTitle(_lessonDTO.getTitle());
                lesson.setOrder(_lessonDTO.getOrder());
                lesson.setUnit(unit.get());
                return Optional.of(_lessonRepository.save(lesson));
            }
        }
        return Optional.empty();
    }

    public boolean deleteLesson(Integer id) {
        if (_lessonRepository.existsById(id)) {
            _lessonRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Integer> getPercentageOfCompletedChallenges(Integer id) {
        // This method would calculate the percentage of completed challenges
        // Assuming the Challenge entity and its repository exist
        // Placeholder logic, update as needed
        return Optional.of(0); // Replace with actual logic
    }
}
