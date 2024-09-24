package ai.fluent.fluentai.User;

import ai.fluent.fluentai.ChallengeProgress.ChallengeProgress;
import ai.fluent.fluentai.Language.Language;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(unique = true)
    private String id;

    private String username;
    private String email;
    private String name;
    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "native_lang_id", nullable = false)
    @JsonIgnoreProperties("users")
    private Language nativeLang;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ChallengeProgress> challengeProgress;

    public User() {
    }

    public User(String _id, String _username, String _email, String _name, String _photoUrl,
            Language _nativeLang) {
        this.id = _id;
        this.username = _username;
        this.email = _email;
        this.name = _name;
        this.photoUrl = _photoUrl;
        this.nativeLang = _nativeLang;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public Language getNativeLang() {
        return nativeLang;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String _username) {
        this.username = _username;
    }

    public void setEmail(String _email) {
        this.email = _email;
    }

    public void setName(String _name) {
        this.name = _name;
    }

    public void setPhotoUrl(String _photoUrl) {
        this.photoUrl = _photoUrl;
    }

    public void setNativeLang(Language _nativeLang) {
        this.nativeLang = _nativeLang;
    }

    public void setCreatedAt(LocalDateTime _createdAt) {
        this.createdAt = _createdAt;
    }

    public void setUpdatedAt(LocalDateTime _updatedAt) {
        this.updatedAt = _updatedAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                ", nativeLang=" + nativeLang +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        User user = (User) o;

        return id != null ? id.equals(user.id) : user.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
