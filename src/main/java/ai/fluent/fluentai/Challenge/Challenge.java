package ai.fluent.fluentai.Challenge;

import ai.fluent.fluentai.Lesson.Lesson;
import ai.fluent.fluentai.ChallengeOption.ChallengeOption;
import ai.fluent.fluentai.ChallengeProgress.ChallengeProgress;
import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "challenges")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    @JsonBackReference
    private Lesson lesson;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChallengeType type;

    @Column(nullable = false)
    private String question;

    @Column(name = "challenge_order", nullable = false)
    private Integer order;

    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ChallengeOption> challengeOptions;

    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ChallengeProgress> challengeProgress;

    public Challenge() {
    }

    public Challenge(Lesson _lesson, ChallengeType _type, String _question, Integer _order) {
        this.lesson = _lesson;
        this.type = _type;
        this.question = _question;
        this.order = _order;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson _lesson) {
        this.lesson = _lesson;
    }

    public ChallengeType getType() {
        return type;
    }

    public void setType(ChallengeType _type) {
        this.type = _type;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String _question) {
        this.question = _question;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer _order) {
        this.order = _order;
    }

    public List<ChallengeOption> getChallengeOptions() {
        return challengeOptions;
    }

    public void setChallengeOptions(List<ChallengeOption> _challengeOptions) {
        this.challengeOptions = _challengeOptions;
    }

    public List<ChallengeProgress> getChallengeProgress() {
        return challengeProgress;
    }

    public void setChallengeProgress(List<ChallengeProgress> _challengeProgress) {
        this.challengeProgress = _challengeProgress;
    }

    @Override
    public boolean equals(Object _o) {
        if (this == _o)
            return true;
        if (_o == null || getClass() != _o.getClass())
            return false;
        Challenge challenge = (Challenge) _o;
        return Objects.equals(id, challenge.id) &&
                Objects.equals(lesson, challenge.lesson) &&
                type == challenge.type &&
                Objects.equals(question, challenge.question) &&
                Objects.equals(order, challenge.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, lesson, type, question, order);
    }

    @Override
    public String toString() {
        return "Challenge{" +
                "id=" + id +
                ", lesson=" + lesson +
                ", type=" + type +
                ", question='" + question + '\'' +
                ", order=" + order +
                '}';
    }

    public enum ChallengeType {
        SELECT, ASSIST
    }

}
