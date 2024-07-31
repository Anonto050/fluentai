package ai.fluent.fluentai.ChallengeOption;

import ai.fluent.fluentai.Challenge.Challenge;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "challenge_options")
public class ChallengeOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false, insertable = false, updatable = false)
    private Challenge challenge;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private Boolean correct;

    @Column(name = "image_src")
    private String imageSrc;

    @Column(name = "audio_src")
    private String audioSrc;

    public ChallengeOption() {
    }

    public ChallengeOption(Challenge _challenge, String _text, Boolean _correct, String _imageSrc, String _audioSrc) {
        this.challenge = _challenge;
        this.text = _text;
        this.correct = _correct;
        this.imageSrc = _imageSrc;
        this.audioSrc = _audioSrc;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer _id) {
        this.id = _id;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge _challenge) {
        this.challenge = _challenge;
    }

    public String getText() {
        return text;
    }

    public void setText(String _text) {
        this.text = _text;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean _correct) {
        this.correct = _correct;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String _imageSrc) {
        this.imageSrc = _imageSrc;
    }

    public String getAudioSrc() {
        return audioSrc;
    }

    public void setAudioSrc(String _audioSrc) {
        this.audioSrc = _audioSrc;
    }

    @Override
    public boolean equals(Object _o) {
        if (this == _o)
            return true;
        if (_o == null || getClass() != _o.getClass())
            return false;
        ChallengeOption that = (ChallengeOption) _o;
        return Objects.equals(id, that.id) &&
                Objects.equals(challenge, that.challenge) &&
                Objects.equals(text, that.text) &&
                Objects.equals(correct, that.correct) &&
                Objects.equals(imageSrc, that.imageSrc) &&
                Objects.equals(audioSrc, that.audioSrc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, challenge, text, correct, imageSrc, audioSrc);
    }

    @Override
    public String toString() {
        return "ChallengeOption{" +
                "id=" + id +
                ", challenge=" + challenge +
                ", text='" + text + '\'' +
                ", correct=" + correct +
                ", imageSrc='" + imageSrc + '\'' +
                ", audioSrc='" + audioSrc + '\'' +
                '}';
    }
}
