package ai.fluent.fluentai.UserProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<UserProgressDTO>> getAllUserProgress(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<UserProgress> userProgressList = userProgressService.getAllUserProgress(page, size);
        long totalUserProgress = userProgressService.countUserProgress();

        List<UserProgressDTO> userProgressDTOList = userProgressList.stream()
                .map(userProgress -> new UserProgressDTO(
                        userProgress.getUser().getId(),
                        userProgress.getActiveCourse().getId(),
                        userProgress.getHearts(),
                        userProgress.getPoints()))
                .collect(Collectors.toList());

        long start = page * size;
        long end = Math.min((page + 1) * size - 1, totalUserProgress - 1);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range",
                "user-progress " + start + "-" + end + "/" + totalUserProgress);

        return new ResponseEntity<>(userProgressDTOList, headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProgressDTO> getUserProgressById(@PathVariable int id) {
        return userProgressService.getUserProgressById(id)
                .map(userProgress -> ResponseEntity.ok(new UserProgressDTO(
                        userProgress.getUser().getId(),
                        userProgress.getActiveCourse().getId(),
                        userProgress.getHearts(),
                        userProgress.getPoints())))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/top-users")
    public ResponseEntity<List<UserProgressDTO>> getTopUsers(@RequestParam int limit) {
        List<UserProgressDTO> topUsers = userProgressService.getTopUsers(limit).stream()
                .map(userProgress -> new UserProgressDTO(
                        userProgress.getUser().getId(),
                        userProgress.getActiveCourse().getId(),
                        userProgress.getHearts(),
                        userProgress.getPoints()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(topUsers, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProgress(@PathVariable int id) {
        return userProgressService.deleteUserProgress(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

}
