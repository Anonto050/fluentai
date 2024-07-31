package ai.fluent.fluentai.Challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService _challengeService;

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return _challengeService.getAllChallenges();
    }

    @PostMapping
    public ResponseEntity<Challenge> createChallenge(@RequestBody Challenge _challenge) {
        return ResponseEntity.status(201).body(_challengeService.createChallenge(_challenge));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Integer _id) {
        return ResponseEntity.of(_challengeService.getChallengeById(_id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Challenge> updateChallenge(@PathVariable Integer _id, @RequestBody Challenge _challenge) {
        return ResponseEntity.of(_challengeService.updateChallenge(_id, _challenge));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Integer _id) {
        return _challengeService.deleteChallenge(_id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/percentage")
    public ResponseEntity<Integer> getPercentageOfCompletedChallenges(@PathVariable Integer _id) {
        return ResponseEntity.of(_challengeService.getPercentageOfCompletedChallenges(_id));
    }
}
