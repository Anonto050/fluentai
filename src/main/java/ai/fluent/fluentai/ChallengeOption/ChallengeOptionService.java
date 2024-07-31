package ai.fluent.fluentai.ChallengeOption;

import ai.fluent.fluentai.Challenge.ChallengeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallengeOptionService {

    @Autowired
    private ChallengeOptionRepository _challengeOptionRepository;

    @Autowired
    private ChallengeRepository _challengeRepository;

    public List<ChallengeOption> getAllChallengeOptions() {
        return _challengeOptionRepository.findAll();
    }

    public ChallengeOption createChallengeOption(ChallengeOption _challengeOption) {
        // Ensure that the Challenge exists before creating a ChallengeOption
        if (_challengeRepository.existsById(_challengeOption.getChallenge().getId())) {
            return _challengeOptionRepository.save(_challengeOption);
        } else {
            throw new IllegalArgumentException("Challenge does not exist.");
        }
    }

    public Optional<ChallengeOption> getChallengeOptionById(Integer _id) {
        return _challengeOptionRepository.findById(_id);
    }

    public Optional<ChallengeOption> updateChallengeOption(Integer _id, ChallengeOption _challengeOption) {
        if (_challengeOptionRepository.existsById(_id)) {
            _challengeOption.setId(_id);
            return Optional.of(_challengeOptionRepository.save(_challengeOption));
        }
        return Optional.empty();
    }

    public boolean deleteChallengeOption(Integer _id) {
        if (_challengeOptionRepository.existsById(_id)) {
            _challengeOptionRepository.deleteById(_id);
            return true;
        }
        return false;
    }
}
