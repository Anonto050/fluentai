package ai.fluent.fluentai.Challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService _challengeService;

    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<Challenge> challenges = _challengeService.getAllChallenges(page, size);
        int totalChallenges = _challengeService.getTotalChallenges();

        // Calculate the range
        int start = page * size;
        int end = Math.min((page + 1) * size - 1, totalChallenges - 1);

        // Create headers and add Content-Range header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "challenges " + start + "-" + end + "/" + totalChallenges);

        return new ResponseEntity<>(challenges, headers, HttpStatus.OK);
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
