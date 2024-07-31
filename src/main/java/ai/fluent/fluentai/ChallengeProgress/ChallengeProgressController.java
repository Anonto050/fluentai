package ai.fluent.fluentai.ChallengeProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/challenge-progress")
public class ChallengeProgressController {

    @Autowired
    private ChallengeProgressService _challengeProgressService;

    @GetMapping
    public List<ChallengeProgress> getAllChallengeProgress() {
        return _challengeProgressService.getAllChallengeProgress();
    }

    @PostMapping
    public ResponseEntity<ChallengeProgress> createChallengeProgress(
            @RequestBody ChallengeProgress _challengeProgress) {
        return ResponseEntity.status(201).body(_challengeProgressService.createChallengeProgress(_challengeProgress));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeProgress> getChallengeProgressById(@PathVariable Integer _id) {
        return ResponseEntity.of(_challengeProgressService.getChallengeProgressById(_id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChallengeProgress> updateChallengeProgress(@PathVariable Integer _id,
            @RequestBody ChallengeProgress _challengeProgress) {
        return ResponseEntity.of(_challengeProgressService.updateChallengeProgress(_id, _challengeProgress));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallengeProgress(@PathVariable Integer _id) {
        return _challengeProgressService.deleteChallengeProgress(_id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
