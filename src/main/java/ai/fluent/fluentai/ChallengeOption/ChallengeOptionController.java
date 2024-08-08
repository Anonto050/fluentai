package ai.fluent.fluentai.ChallengeOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/v1/challenge-options")
public class ChallengeOptionController {

        @Autowired
        private ChallengeOptionService challengeOptionService;

        @PostMapping
        public ResponseEntity<ChallengeOption> createChallengeOption(
                        @RequestBody ChallengeOptionDTO challengeOptionDTO) {
                return challengeOptionService.createChallengeOption(challengeOptionDTO)
                                .map(challengeOption -> ResponseEntity.ok(challengeOption))
                                .orElse(ResponseEntity.badRequest().build());
        }

        @PutMapping("/{id}")
        public ResponseEntity<ChallengeOption> updateChallengeOption(@PathVariable Integer id,
                        @RequestBody ChallengeOptionDTO challengeOptionDTO) {
                return challengeOptionService.updateChallengeOption(id, challengeOptionDTO)
                                .map(challengeOption -> ResponseEntity.ok(challengeOption))
                                .orElse(ResponseEntity.notFound().build());
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteChallengeOption(@PathVariable Integer id) {
                return challengeOptionService.deleteChallengeOption(id) ? ResponseEntity.noContent().build()
                                : ResponseEntity.notFound().build();
        }

        @GetMapping("/{id}")
        public ResponseEntity<ChallengeOptionDTO> getChallengeOptionById(@PathVariable Integer id) {
                return challengeOptionService.getChallengeOptionById(id)
                                .map(challengeOption -> {
                                        ChallengeOptionDTO dto = new ChallengeOptionDTO(
                                                        challengeOption.getChallenge().getId(),
                                                        challengeOption.getText(),
                                                        challengeOption.getCorrect(),
                                                        challengeOption.getImageSrc(),
                                                        challengeOption.getAudioSrc());
                                        dto.setId(challengeOption.getId());
                                        return ResponseEntity.ok(dto);
                                })
                                .orElse(ResponseEntity.notFound().build());
        }

        @GetMapping
        public ResponseEntity<List<ChallengeOptionDTO>> getAllChallengeOptions() {
                List<ChallengeOption> challengeOptions = challengeOptionService.getAllChallengeOptions();
                List<ChallengeOptionDTO> dtos = challengeOptions.stream()
                                .map(co -> new ChallengeOptionDTO(
                                                co.getChallenge().getId(),
                                                co.getText(),
                                                co.getCorrect(),
                                                co.getImageSrc(),
                                                co.getAudioSrc()))
                                .collect(Collectors.toList());
                return ResponseEntity.ok(dtos);
        }
}
