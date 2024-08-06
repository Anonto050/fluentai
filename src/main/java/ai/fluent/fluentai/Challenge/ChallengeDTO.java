package ai.fluent.fluentai.Challenge;

public class ChallengeDTO {

    private Integer id;
    private Integer lessonId;
    private Challenge.ChallengeType type;
    private String question;
    private Integer order;

    public ChallengeDTO() {
    }

    public ChallengeDTO(Integer _lessonId, Challenge.ChallengeType _type, String _question, Integer _order) {
        this.lessonId = _lessonId;
        this.type = _type;
        this.question = _question;
        this.order = _order;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer _id) {
        this.id = _id;
    }

    public Integer getLessonId() {
        return lessonId;
    }

    public void setLessonId(Integer _lessonId) {
        this.lessonId = _lessonId;
    }

    public Challenge.ChallengeType getType() {
        return type;
    }

    public void setType(Challenge.ChallengeType _type) {
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

}
