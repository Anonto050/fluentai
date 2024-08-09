package ai.fluent.fluentai.UserProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/user-progress")
public class UserProgressController {

    @Autowired
    private UserProgressService userProgressService;

    @PostMapping
    public ResponseEntity<UserProgress> createUserProgress(@RequestBody UserProgressDTO userProgressDTO) {
        return userProgressService.createUserProgress(userProgressDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProgress> updateUserProgress(@PathVariable int id,
            @RequestBody UserProgressDTO userProgressDTO) {
        return userProgressService.updateUserProgress(id, userProgressDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping
    public ResponseEntity<List<UserProgress>> getAllUserProgress() {
        List<UserProgress> userProgressList = userProgressService.getAllUserProgress();
        return ResponseEntity.ok(userProgressList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProgress> getUserProgressById(@PathVariable int id) {
        return userProgressService.getUserProgressById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProgress(@PathVariable int id) {
        return userProgressService.deleteUserProgress(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

}
