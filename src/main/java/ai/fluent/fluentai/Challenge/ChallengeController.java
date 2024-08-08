package ai.fluent.fluentai.Challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/v1/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService _challengeService;

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return _challengeService.getAllChallenges();
    }

    @PostMapping
    public ResponseEntity<Challenge> createChallenge(@RequestBody ChallengeDTO _challengeDTO) {
        return _challengeService.createChallenge(_challengeDTO)
                .map(challenge -> ResponseEntity.ok(challenge))
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Integer id) {
        return ResponseEntity.of(_challengeService.getChallengeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Challenge> updateChallenge(@PathVariable Integer id,
            @RequestBody ChallengeDTO _challengeDTO) {
        return _challengeService.updateChallenge(id, _challengeDTO)
                .map(challenge -> ResponseEntity.ok(challenge))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Integer id) {
        return _challengeService.deleteChallenge(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/percentage")
    public ResponseEntity<Integer> getPercentageOfCompletedChallenges(@PathVariable Integer id) {
        return ResponseEntity.of(_challengeService.getPercentageOfCompletedChallenges(id));
    }
}
