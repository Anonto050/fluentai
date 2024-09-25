package ai.fluent.fluentai.ChallengeProgress;

import ai.fluent.fluentai.Challenge.*;
import ai.fluent.fluentai.User.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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

    public Optional<ChallengeProgress> updateChallengeProgress(String userId,
            ChallengeProgressDTO challengeProgressDTO) {
        List<ChallengeProgress> existingChallengeProgress = challengeProgressRepository.findByUserId(userId);
        if (existingChallengeProgress.isEmpty()) {
            return Optional.empty();
        }
        ChallengeProgress challengeProgress = existingChallengeProgress.get(0);
        challengeProgress.setCompleted(challengeProgressDTO.getCompleted());
        return Optional.of(challengeProgressRepository.save(challengeProgress));
    }

    public void deleteChallengeProgress(Integer id) {
        challengeProgressRepository.deleteById(id);
    }

    public Optional<ChallengeProgress> getChallengeProgressById(Integer id) {
        return challengeProgressRepository.findById(id);
    }

    public List<ChallengeProgress> getChallengeProgressByUserId(String userId) {
        return challengeProgressRepository.findByUserId(userId);
    }

    public List<ChallengeProgress> getAllChallengeProgress() {
        return challengeProgressRepository.findAll();
    }

    public List<ChallengeProgress> getAllChallengeProgress(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return challengeProgressRepository.findAll(pageable).getContent();
    }

    public int getTotalChallengeProgress() {
        return (int) challengeProgressRepository.count();
    }
}
