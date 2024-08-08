package ai.fluent.fluentai.ChallengeProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
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
            ChallengeProgressDTO dto = new ChallengeProgressDTO(cp.getUser().getId(), cp.getChallenge().getId(),
                    cp.getCompleted());
            dto.setId(cp.getId());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ChallengeProgressDTO>> getAllChallengeProgress() {
        List<ChallengeProgress> challengeProgressList = challengeProgressService.getAllChallengeProgress();
        List<ChallengeProgressDTO> dtos = challengeProgressList.stream()
                .map(cp -> {
                    ChallengeProgressDTO dto = new ChallengeProgressDTO(cp.getUser().getId(), cp.getChallenge().getId(),
                            cp.getCompleted());
                    dto.setId(cp.getId());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
