package ai.fluent.fluentai.Lesson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/lessons")
public class LessonController {

    @Autowired
    private LessonService _lessonService;

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<Lesson> lessons = _lessonService.getAllLessons(page, size);
        int totalLessons = _lessonService.getTotalLessons();

        int start = page * size;
        int end = Math.min((page + 1) * size - 1, totalLessons - 1);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "lessons " + start + "-" + end + "/" + totalLessons);

        return new ResponseEntity<>(lessons, headers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Lesson> createLesson(@RequestBody LessonDTO _lessonDTO) {
        return _lessonService.createLesson(_lessonDTO)
                .map(lesson -> ResponseEntity.ok(lesson))
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Integer id) {
        return ResponseEntity.of(_lessonService.getLessonById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Integer id, @RequestBody LessonDTO _lessonDTO) {
        return _lessonService.updateLesson(id, _lessonDTO)
                .map(lesson -> ResponseEntity.ok(lesson))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Integer id) {
        return _lessonService.deleteLesson(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/percentage")
    public ResponseEntity<Integer> getPercentageOfCompletedChallenges(@PathVariable Integer id) {
        return ResponseEntity.of(_lessonService.getPercentageOfCompletedChallenges(id));
    }
}
