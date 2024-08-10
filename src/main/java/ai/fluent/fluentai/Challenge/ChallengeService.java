package ai.fluent.fluentai.Challenge;

import ai.fluent.fluentai.Lesson.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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

    public List<Challenge> getAllChallenges(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return _challengeRepository.findAll(pageable).getContent();
    }

    public int getTotalChallenges() {
        return (int) _challengeRepository.count();
    }

    public Optional<Challenge> createChallenge(ChallengeDTO _challengeDTO) {
        Optional<Lesson> lesson = _lessonRepository.findById(_challengeDTO.getLessonId());
        if (lesson.isPresent()) {
            Challenge challenge = new Challenge();
            challenge.setType(_challengeDTO.getType());
            challenge.setQuestion(_challengeDTO.getQuestion());
            challenge.setOrder(_challengeDTO.getOrder());
            challenge.setLesson(lesson.get());
            return Optional.of(_challengeRepository.save(challenge));
        }
        return Optional.empty();
    }

    public Optional<Challenge> getChallengeById(Integer id) {
        return _challengeRepository.findById(id);
    }

    public Optional<Challenge> updateChallenge(Integer id, ChallengeDTO _challengeDTO) {
        Optional<Challenge> existingChallenge = _challengeRepository.findById(id);
        if (existingChallenge.isPresent()) {
            Optional<Lesson> lesson = _lessonRepository.findById(_challengeDTO.getLessonId());
            if (lesson.isPresent()) {
                Challenge challenge = existingChallenge.get();
                challenge.setType(_challengeDTO.getType());
                challenge.setQuestion(_challengeDTO.getQuestion());
                challenge.setOrder(_challengeDTO.getOrder());
                challenge.setLesson(lesson.get());
                return Optional.of(_challengeRepository.save(challenge));
            }
        }
        return Optional.empty();
    }

    public boolean deleteChallenge(Integer id) {
        if (_challengeRepository.existsById(id)) {
            _challengeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Integer> getPercentageOfCompletedChallenges(Integer id) {
        // This method would calculate the percentage of completed challenges
        // Placeholder logic, update as needed
        return Optional.of(0); // Replace with actual logic
    }
}
