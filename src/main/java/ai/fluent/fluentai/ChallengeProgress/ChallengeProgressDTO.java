package ai.fluent.fluentai.ChallengeProgress;

public class ChallengeProgressDTO {

    private Integer id;
    private Integer userId;
    private Integer challengeId;
    private Boolean completed;

    public ChallengeProgressDTO() {
    }

    public ChallengeProgressDTO(Integer _userId, Integer _challengeId, Boolean _completed) {
        this.userId = _userId;
        this.challengeId = _challengeId;
        this.completed = _completed;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Integer challengeId) {
        this.challengeId = challengeId;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
