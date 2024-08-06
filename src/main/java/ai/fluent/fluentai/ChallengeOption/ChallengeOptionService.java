package ai.fluent.fluentai.ChallengeOption;

import ai.fluent.fluentai.Challenge.*;

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

    public Optional<ChallengeOption> createChallengeOption(ChallengeOptionDTO _challengeOptionDTO) {
        Optional<Challenge> challenge = _challengeRepository.findById(_challengeOptionDTO.getChallengeId());
        if (challenge.isPresent()) {
            ChallengeOption challengeOption = new ChallengeOption();
            challengeOption.setChallenge(challenge.get());
            challengeOption.setText(_challengeOptionDTO.getText());
            challengeOption.setCorrect(_challengeOptionDTO.getCorrect());
            challengeOption.setImageSrc(_challengeOptionDTO.getImageSrc());
            challengeOption.setAudioSrc(_challengeOptionDTO.getAudioSrc());
            return Optional.of(_challengeOptionRepository.save(challengeOption));
        }
        return Optional.empty();
    }

    public Optional<ChallengeOption> getChallengeOptionById(Integer id) {
        return _challengeOptionRepository.findById(id);
    }

    public Optional<ChallengeOption> updateChallengeOption(Integer id, ChallengeOptionDTO _challengeOptionDTO) {
        Optional<ChallengeOption> existingChallengeOption = _challengeOptionRepository.findById(id);
        if (existingChallengeOption.isPresent()) {
            Optional<Challenge> challenge = _challengeRepository.findById(_challengeOptionDTO.getChallengeId());
            if (challenge.isPresent()) {
                ChallengeOption challengeOption = existingChallengeOption.get();
                challengeOption.setChallenge(challenge.get());
                challengeOption.setText(_challengeOptionDTO.getText());
                challengeOption.setCorrect(_challengeOptionDTO.getCorrect());
                challengeOption.setImageSrc(_challengeOptionDTO.getImageSrc());
                challengeOption.setAudioSrc(_challengeOptionDTO.getAudioSrc());
                return Optional.of(_challengeOptionRepository.save(challengeOption));
            }
        }
        return Optional.empty();
    }

    public boolean deleteChallengeOption(Integer id) {
        if (_challengeOptionRepository.existsById(id)) {
            _challengeOptionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
