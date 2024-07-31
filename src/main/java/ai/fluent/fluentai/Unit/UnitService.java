package ai.fluent.fluentai.Unit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UnitService {

    @Autowired
    private UnitRepository _unitRepository;

    public List<Unit> getAllUnits() {
        return _unitRepository.findAll();
    }

    public Unit createUnit(Unit _unit) {
        return _unitRepository.save(_unit);
    }

    public Optional<Unit> getUnitById(Integer _id) {
        return _unitRepository.findById(_id);
    }

    public List<Unit> getUnitsByCourseId(Integer _courseId) {
        return _unitRepository.findByCourseId(_courseId);
    }

    public Optional<Unit> updateUnit(Integer _id, Unit _unit) {
        if (_unitRepository.existsById(_id)) {
            _unit.setId(_id);
            return Optional.of(_unitRepository.save(_unit));
        }
        return Optional.empty();
    }

    public boolean deleteUnit(Integer _id) {
        if (_unitRepository.existsById(_id)) {
            _unitRepository.deleteById(_id);
            return true;
        }
        return false;
    }
}
