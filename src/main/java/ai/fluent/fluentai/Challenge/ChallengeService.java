package ai.fluent.fluentai.Challenge;

import ai.fluent.fluentai.Lesson.LessonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository _challengeRepository;

    @Autowired
    private LessonRepository _lessonRepository;

    public List<Challenge> getAllChallenges() {
        return _challengeRepository.findAll();
    }

    public Challenge createChallenge(Challenge _challenge) {
        // Ensure that the Lesson exists before creating a Challenge
        if (_lessonRepository.existsById(_challenge.getLesson().getId())) {
            return _challengeRepository.save(_challenge);
        } else {
            throw new IllegalArgumentException("Lesson does not exist.");
        }
    }

    public Optional<Challenge> getChallengeById(Integer _id) {
        return _challengeRepository.findById(_id);
    }

    public Optional<Challenge> updateChallenge(Integer _id, Challenge _challenge) {
        if (_challengeRepository.existsById(_id)) {
            _challenge.setId(_id);
            return Optional.of(_challengeRepository.save(_challenge));
        }
        return Optional.empty();
    }

    public boolean deleteChallenge(Integer _id) {
        if (_challengeRepository.existsById(_id)) {
            _challengeRepository.deleteById(_id);
            return true;
        }
        return false;
    }

    public Optional<Integer> getPercentageOfCompletedChallenges(Integer _id) {
        // This method would calculate the percentage of completed challenges
        // Placeholder logic, update as needed
        return Optional.of(0); // Replace with actual logic
    }
}
