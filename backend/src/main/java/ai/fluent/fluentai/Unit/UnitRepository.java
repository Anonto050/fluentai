package ai.fluent.fluentai.Unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer> {

    List<Unit> findByCourseId(Integer _courseId);
}
