package ai.fluent.fluentai.Lesson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/lessons")
public class LessonController {

    @Autowired
    private LessonService _lessonService;

    @GetMapping
    public List<Lesson> getAllLessons() {
        return _lessonService.getAllLessons();
    }

    @PostMapping
    public ResponseEntity<Lesson> createLesson(@RequestBody Lesson _lesson) {
        return ResponseEntity.status(201).body(_lessonService.createLesson(_lesson));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Integer _id) {
        return ResponseEntity.of(_lessonService.getLessonById(_id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Integer _id, @RequestBody Lesson _lesson) {
        return ResponseEntity.of(_lessonService.updateLesson(_id, _lesson));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Integer _id) {
        return _lessonService.deleteLesson(_id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/percentage")
    public ResponseEntity<Integer> getPercentageOfCompletedChallenges(@PathVariable Integer _id) {
        return ResponseEntity.of(_lessonService.getPercentageOfCompletedChallenges(_id));
    }
}
