package ai.fluent.fluentai.ChallengeProgress;

import ai.fluent.fluentai.Challenge.*;
import ai.fluent.fluentai.User.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallengeProgressService {

    @Autowired
    private ChallengeProgressRepository challengeProgressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    public ChallengeProgress createChallengeProgress(ChallengeProgressDTO challengeProgressDTO) {
        User user = userRepository.findById(challengeProgressDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Challenge challenge = challengeRepository.findById(challengeProgressDTO.getChallengeId())
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        ChallengeProgress challengeProgress = new ChallengeProgress(user, challenge,
                challengeProgressDTO.getCompleted());
        return challengeProgressRepository.save(challengeProgress);
    }

    public Optional<ChallengeProgress> updateChallengeProgress(Integer id, ChallengeProgressDTO challengeProgressDTO) {
        return challengeProgressRepository.findById(id).map(challengeProgress -> {
            challengeProgress.setCompleted(challengeProgressDTO.getCompleted());
            return challengeProgressRepository.save(challengeProgress);
        });
    }

    public void deleteChallengeProgress(Integer id) {
        challengeProgressRepository.deleteById(id);
    }

    public Optional<ChallengeProgress> getChallengeProgressById(Integer id) {
        return challengeProgressRepository.findById(id);
    }

    public List<ChallengeProgress> getAllChallengeProgress() {
        return challengeProgressRepository.findAll();
    }
}