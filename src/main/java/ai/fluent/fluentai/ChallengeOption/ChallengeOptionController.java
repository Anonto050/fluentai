package ai.fluent.fluentai.ChallengeOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
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
        public ResponseEntity<List<ChallengeOptionDTO>> getAllChallengeOptions(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                List<ChallengeOption> challengeOptions = challengeOptionService.getAllChallengeOptions(page, size);
                int totalChallengeOptions = challengeOptionService.getTotalChallengeOptions();

                List<ChallengeOptionDTO> dtos = challengeOptions.stream()
                                .map(co -> new ChallengeOptionDTO(
                                                co.getChallenge().getId(),
                                                co.getText(),
                                                co.getCorrect(),
                                                co.getImageSrc(),
                                                co.getAudioSrc()))
                                .collect(Collectors.toList());

                // Calculate the range
                int start = page * size;
                int end = Math.min((page + 1) * size - 1, totalChallengeOptions - 1);

                // Create headers and add Content-Range header
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Range", "challenge-options " + start + "-" + end + "/" + totalChallengeOptions);

                return new ResponseEntity<>(dtos, headers, HttpStatus.OK);
        }
}
