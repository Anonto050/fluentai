package ai.fluent.fluentai.Unit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/units")
public class UnitController {

    @Autowired
    private UnitService _unitService;

    @GetMapping
    public ResponseEntity<List<Unit>> getAllUnits() {
        return new ResponseEntity<>(_unitService.getAllUnits(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Unit> createUnit(@RequestBody Unit _unit) {
        return new ResponseEntity<>(_unitService.createUnit(_unit), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable Integer _id) {
        return _unitService.getUnitById(_id)
                .map(unit -> new ResponseEntity<>(unit, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Unit>> getUnitsByCourseId(@PathVariable Integer _courseId) {
        return new ResponseEntity<>(_unitService.getUnitsByCourseId(_courseId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Unit> updateUnit(@PathVariable Integer _id, @RequestBody Unit _unit) {
        return _unitService.updateUnit(_id, _unit)
                .map(updatedUnit -> new ResponseEntity<>(updatedUnit, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Integer _id) {
        if (_unitService.deleteUnit(_id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
