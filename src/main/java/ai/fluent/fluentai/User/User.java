package ai.fluent.fluentai.User;

import ai.fluent.fluentai.ChallengeProgress.ChallengeProgress;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String name;
    private String photoUrl;
    private String nativeLangId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ChallengeProgress> challengeProgress;

    public User() {
    }

    public User(String _username, String _email, String _password, String _name, String _photoUrl,
            String _nativeLangId) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.name = _name;
        this.photoUrl = _photoUrl;
        this.nativeLangId = _nativeLangId;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public String getNativeLangId() {
        return nativeLangId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // Setters
    public void setId(Long _id) {
        this.id = _id;
    }

    public void setUsername(String _username) {
        this.username = _username;
    }

    public void setEmail(String _email) {
        this.email = _email;
    }

    public void setPassword(String _password) {
        this.password = _password;
    }

    public void setName(String _name) {
        this.name = _name;
    }

    public void setPhotoUrl(String _photoUrl) {
        this.photoUrl = _photoUrl;
    }

    public void setNativeLangId(String _nativeLangId) {
        this.nativeLangId = _nativeLangId;
    }

    public void setCreatedAt(LocalDateTime _createdAt) {
        this.createdAt = _createdAt;
    }

    public void setUpdatedAt(LocalDateTime _updatedAt) {
        this.updatedAt = _updatedAt;
    }

    // toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                ", nativeLangId='" + nativeLangId + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    // equals and hashCode
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