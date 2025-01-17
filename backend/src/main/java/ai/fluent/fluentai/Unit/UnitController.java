package ai.fluent.fluentai.Unit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/units")
public class UnitController {

    @Autowired
    private UnitService _unitService;

    @GetMapping
    public ResponseEntity<List<Unit>> getAllUnits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<Unit> units = _unitService.getAllUnits(page, size);
        int totalUnits = _unitService.getTotalUnits();

        int start = page * size;
        int end = Math.min((page + 1) * size - 1, totalUnits - 1);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "units " + start + "-" + end + "/" + totalUnits);

        return new ResponseEntity<>(units, headers, HttpStatus.OK);
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
