package ai.fluent.fluentai.UserProgress;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Integer> {

    @Query("SELECT u FROM UserProgress u ORDER BY u.points DESC")
    List<UserProgress> findTopUsers(Pageable pageable);
}
