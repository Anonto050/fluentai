package ai.fluent.fluentai.ChallengeOption;

public class ChallengeOptionDTO {

    private Integer id;
    private Integer challengeId;
    private String text;
    private Boolean correct;
    private String imageSrc;
    private String audioSrc;

    public ChallengeOptionDTO() {
    }

    public ChallengeOptionDTO(Integer _id, Integer _challengeId, String _text, Boolean _correct, String _imageSrc,
            String _audioSrc) {
        this.id = _id;
        this.challengeId = _challengeId;
        this.text = _text;
        this.correct = _correct;
        this.imageSrc = _imageSrc;
        this.audioSrc = _audioSrc;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Integer challengeId) {
        this.challengeId = challengeId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getAudioSrc() {
        return audioSrc;
    }

    public void setAudioSrc(String audioSrc) {
        this.audioSrc = audioSrc;
    }
}
