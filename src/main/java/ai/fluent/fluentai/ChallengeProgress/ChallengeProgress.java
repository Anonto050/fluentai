package ai.fluent.fluentai.ChallengeProgress;

import ai.fluent.fluentai.Challenge.Challenge;
import ai.fluent.fluentai.User.User;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "challenge_progress")
public class ChallengeProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false, insertable = false, updatable = false)
    private Challenge challenge;

    @Column(nullable = false)
    private Boolean completed;

    public ChallengeProgress() {
    }

    public ChallengeProgress(User _user, Challenge _challenge, Boolean _completed) {
        this.user = _user;
        this.challenge = _challenge;
        this.completed = _completed;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer _id) {
        this.id = _id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User _user) {
        this.user = _user;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge _challenge) {
        this.challenge = _challenge;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean _completed) {
        this.completed = _completed;
    }

    @Override
    public boolean equals(Object _o) {
        if (this == _o)
            return true;
        if (_o == null || getClass() != _o.getClass())
            return false;
        ChallengeProgress that = (ChallengeProgress) _o;
        return Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                Objects.equals(challenge, that.challenge) &&
                Objects.equals(completed, that.completed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, challenge, completed);
    }

    @Override
    public String toString() {
        return "ChallengeProgress{" +
                "id=" + id +
                ", user=" + user +
                ", challenge=" + challenge +
                ", completed=" + completed +
                '}';
    }
}
