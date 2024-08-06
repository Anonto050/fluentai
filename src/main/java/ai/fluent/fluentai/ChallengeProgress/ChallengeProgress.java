package ai.fluent.fluentai.ChallengeProgress;

import ai.fluent.fluentai.User.User;
import ai.fluent.fluentai.Challenge.Challenge;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "challenge_progress")
public class ChallengeProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    @JsonBackReference
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

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
