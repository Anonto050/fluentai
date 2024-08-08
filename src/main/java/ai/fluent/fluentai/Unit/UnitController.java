package ai.fluent.fluentai.Unit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/v1/units")
public class UnitController {

    @Autowired
    private UnitService _unitService;

    @GetMapping
    public ResponseEntity<List<Unit>> getAllUnits() {
        return new ResponseEntity<>(_unitService.getAllUnits(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Unit> createUnit(@RequestBody UnitDTO _unitDTO) {
        return _unitService.createUnit(_unitDTO)
                .map(unit -> new ResponseEntity<>(unit, HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable Integer id) {
        return _unitService.getUnitById(id)
                .map(unit -> new ResponseEntity<>(unit, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Unit>> getUnitsByCourseId(@PathVariable Integer _courseId) {
        return new ResponseEntity<>(_unitService.getUnitsByCourseId(_courseId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Unit> updateUnit(@PathVariable Integer id, @RequestBody UnitDTO _unitDTO) {
        return _unitService.updateUnit(id, _unitDTO)
                .map(updatedUnit -> new ResponseEntity<>(updatedUnit, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Integer id) {
        if (_unitService.deleteUnit(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
