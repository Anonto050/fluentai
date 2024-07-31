package ai.fluent.fluentai.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository _courseRepository;

    public List<Course> getAllCourses() {
        return _courseRepository.findAll();
    }

    public Course createCourse(Course _course) {
        return _courseRepository.save(_course);
    }

    public Optional<Course> getCourseById(Integer _id) {
        return _courseRepository.findById(_id);
    }

    public Optional<Course> updateCourse(Integer _id, Course _course) {
        if (_courseRepository.existsById(_id)) {
            _course.setId(_id);
            return Optional.of(_courseRepository.save(_course));
        }
        return Optional.empty();
    }

    public boolean deleteCourse(Integer _id) {
        if (_courseRepository.existsById(_id)) {
            _courseRepository.deleteById(_id);
            return true;
        }
        return false;
    }
}
