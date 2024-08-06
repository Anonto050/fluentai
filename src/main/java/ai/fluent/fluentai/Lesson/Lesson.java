package ai.fluent.fluentai.Lesson;

import ai.fluent.fluentai.Challenge.Challenge;

import ai.fluent.fluentai.Unit.Unit;
import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    @JsonBackReference
    private Unit unit;

    @Column(name = "lesson_order", nullable = false)
    private Integer order;

    @OneToMany(mappedBy = "lesson", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Challenge> challenges;

    public Lesson() {
    }

    public Lesson(String _title, Unit _unit, Integer _order) {
        this.title = _title;
        this.unit = _unit;
        this.order = _order;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String _title) {
        this.title = _title;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit _unit) {
        this.unit = _unit;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer _order) {
        this.order = _order;
    }

    public List<Challenge> getChallenges() {
        return challenges;
    }

    public void setChallenges(List<Challenge> _challenges) {
        this.challenges = _challenges;
    }

    @Override
    public boolean equals(Object _o) {
        if (this == _o)
            return true;
        if (_o == null || getClass() != _o.getClass())
            return false;
        Lesson lesson = (Lesson) _o;
        return Objects.equals(id, lesson.id) &&
                Objects.equals(title, lesson.title) &&
                Objects.equals(unit, lesson.unit) &&
                Objects.equals(order, lesson.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, unit, order);
    }

    @Override
    public String toString() {
        return "Lesson{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", unit=" + unit +
                ", order=" + order +
                '}';
    }
}
