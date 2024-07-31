package ai.fluent.fluentai.ChallengeOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/challenge-options")
public class ChallengeOptionController {

    @Autowired
    private ChallengeOptionService _challengeOptionService;

    @GetMapping
    public List<ChallengeOption> getAllChallengeOptions() {
        return _challengeOptionService.getAllChallengeOptions();
    }

    @PostMapping
    public ResponseEntity<ChallengeOption> createChallengeOption(@RequestBody ChallengeOption _challengeOption) {
        return ResponseEntity.status(201).body(_challengeOptionService.createChallengeOption(_challengeOption));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeOption> getChallengeOptionById(@PathVariable Integer _id) {
        return ResponseEntity.of(_challengeOptionService.getChallengeOptionById(_id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChallengeOption> updateChallengeOption(@PathVariable Integer _id,
            @RequestBody ChallengeOption _challengeOption) {
        return ResponseEntity.of(_challengeOptionService.updateChallengeOption(_id, _challengeOption));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallengeOption(@PathVariable Integer _id) {
        return _challengeOptionService.deleteChallengeOption(_id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
