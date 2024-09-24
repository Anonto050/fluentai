package ai.fluent.fluentai.ChallengeProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/challenge-progress")
public class ChallengeProgressController {

    @Autowired
    private ChallengeProgressService challengeProgressService;

    @PostMapping
    public ResponseEntity<ChallengeProgress> createChallengeProgress(
            @RequestBody ChallengeProgressDTO challengeProgressDTO) {
        ChallengeProgress challengeProgress = challengeProgressService.createChallengeProgress(challengeProgressDTO);
        return ResponseEntity.ok(challengeProgress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChallengeProgress> updateChallengeProgress(@PathVariable Integer id,
            @RequestBody ChallengeProgressDTO challengeProgressDTO) {
        Optional<ChallengeProgress> updatedChallengeProgress = challengeProgressService.updateChallengeProgress(id,
                challengeProgressDTO);
        return updatedChallengeProgress.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallengeProgress(@PathVariable Integer id) {
        challengeProgressService.deleteChallengeProgress(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeProgressDTO> getChallengeProgressById(@PathVariable Integer id) {
        Optional<ChallengeProgress> challengeProgress = challengeProgressService.getChallengeProgressById(id);
        if (challengeProgress.isPresent()) {
            ChallengeProgress cp = challengeProgress.get();
            ChallengeProgressDTO dto = new ChallengeProgressDTO(cp.getId(), cp.getUser().getId(),
                    cp.getChallenge().getId(),
                    cp.getCompleted());
            dto.setId(cp.getId());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChallengeProgressDTO>> getChallengeProgressByUserId(@PathVariable String userId) {
        List<ChallengeProgress> challengeProgressList = challengeProgressService.getChallengeProgressByUserId(userId);
        if (challengeProgressList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ChallengeProgressDTO> dtos = challengeProgressList.stream()
                .map(cp -> new ChallengeProgressDTO(cp.getId(), cp.getUser().getId(), cp.getChallenge().getId(),
                        cp.getCompleted()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping
    public ResponseEntity<List<ChallengeProgressDTO>> getAllChallengeProgress(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String userId,
            @RequestParam int challengeId) {

        List<ChallengeProgress> challengeProgressList = challengeProgressService.getAllChallengeProgress(page, size);
        if (userId != "0") {
            challengeProgressList = challengeProgressList.stream()
                    .filter(cp -> cp.getUser().getId().equals(userId))
                    .collect(Collectors.toList());
        }
        if (challengeId != 0) {
            challengeProgressList = challengeProgressList.stream()
                    .filter(cp -> cp.getChallenge().getId().equals(challengeId))
                    .collect(Collectors.toList());
        }
        int totalChallengeProgress = challengeProgressService.getTotalChallengeProgress();

        List<ChallengeProgressDTO> dtos = challengeProgressList.stream()
                .map(cp -> new ChallengeProgressDTO(cp.getId(), cp.getUser().getId(), cp.getChallenge().getId(),
                        cp.getCompleted()))
                .collect(Collectors.toList());

        // Calculate the range
        int start = page * size;
        int end = Math.min((page + 1) * size - 1, totalChallengeProgress - 1);

        // Create headers and add Content-Range header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "challenge-progress " + start + "-" + end + "/" + totalChallengeProgress);

        return new ResponseEntity<>(dtos, headers, HttpStatus.OK);
    }
}
