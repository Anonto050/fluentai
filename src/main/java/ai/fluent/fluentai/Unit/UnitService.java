package ai.fluent.fluentai.Unit;

import ai.fluent.fluentai.Course.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import ai.fluent.fluentai.Course.Course;

import java.util.List;
import java.util.Optional;

@Service
public class UnitService {

    @Autowired
    private UnitRepository _unitRepository;

    @Autowired
    private CourseRepository _courseRepository;

    public List<Unit> getAllUnits() {
        return _unitRepository.findAll();
    }

    public List<Unit> getAllUnits(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return _unitRepository.findAll(pageable).getContent();
    }

    public int getTotalUnits() {
        return (int) _unitRepository.count();
    }

    public Optional<Unit> createUnit(UnitDTO _unitDTO) {
        System.out.println(_unitDTO);
        Unit unit = new Unit();
        Optional<Course> course = _courseRepository.findById(_unitDTO.getCourseId());
        System.out.println(course);
        if (course.isPresent()) {
            System.out.println("Course is present");
            unit.setTitle(_unitDTO.getTitle());
            unit.setDescription(_unitDTO.getDescription());
            unit.setOrder(_unitDTO.getOrder());
            unit.setCourse(course.get());
            System.out.println(unit);
            return Optional.of(_unitRepository.save(unit));
        }
        return Optional.empty();
    }

    public Optional<Unit> getUnitById(Integer id) {
        return _unitRepository.findById(id);
    }

    public List<Unit> getUnitsByCourseId(Integer _courseId) {
        return _unitRepository.findByCourseId(_courseId);
    }

    public Optional<Unit> updateUnit(Integer id, UnitDTO _unitDTO) {
        Optional<Unit> existingUnit = _unitRepository.findById(id);
        if (existingUnit.isPresent()) {
            Optional<Course> course = _courseRepository.findById(_unitDTO.getCourseId());
            if (course.isPresent()) {
                Unit unit = existingUnit.get();
                unit.setTitle(_unitDTO.getTitle());
                unit.setDescription(_unitDTO.getDescription());
                unit.setOrder(_unitDTO.getOrder());
                unit.setCourse(course.get());
                return Optional.of(_unitRepository.save(unit));
            }
        }
        return Optional.empty();
    }

    public boolean deleteUnit(Integer id) {
        if (_unitRepository.existsById(id)) {
            _unitRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
