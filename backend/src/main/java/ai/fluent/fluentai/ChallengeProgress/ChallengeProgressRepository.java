package ai.fluent.fluentai.ChallengeProgress;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Integer> {
    List<ChallengeProgress> findByUserId(String userId);
}
