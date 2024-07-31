package ai.fluent.fluentai.ChallengeProgress;

import ai.fluent.fluentai.Challenge.ChallengeRepository;
import ai.fluent.fluentai.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallengeProgressService {

    @Autowired
    private ChallengeProgressRepository _challengeProgressRepository;

    @Autowired
    private ChallengeRepository _challengeRepository;

    @Autowired
    private UserRepository _userRepository;

    public List<ChallengeProgress> getAllChallengeProgress() {
        return _challengeProgressRepository.findAll();
    }

    public ChallengeProgress createChallengeProgress(ChallengeProgress _challengeProgress) {
        // Ensure that the Challenge and User exist before creating ChallengeProgress
        if (_challengeRepository.existsById(_challengeProgress.getChallenge().getId()) &&
                _userRepository.existsById(_challengeProgress.getUser().getId())) {
            return _challengeProgressRepository.save(_challengeProgress);
        } else {
            throw new IllegalArgumentException("Challenge or User does not exist.");
        }
    }

    public Optional<ChallengeProgress> getChallengeProgressById(Integer _id) {
        return _challengeProgressRepository.findById(_id);
    }

    public Optional<ChallengeProgress> updateChallengeProgress(Integer _id, ChallengeProgress _challengeProgress) {
        if (_challengeProgressRepository.existsById(_id)) {
            _challengeProgress.setId(_id);
            return Optional.of(_challengeProgressRepository.save(_challengeProgress));
        }
        return Optional.empty();
    }

    public boolean deleteChallengeProgress(Integer _id) {
        if (_challengeProgressRepository.existsById(_id)) {
            _challengeProgressRepository.deleteById(_id);
            return true;
        }
        return false;
    }
}
