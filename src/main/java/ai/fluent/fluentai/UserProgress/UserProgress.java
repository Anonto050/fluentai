package ai.fluent.fluentai.UserProgress;

import ai.fluent.fluentai.Course.Course;
import ai.fluent.fluentai.User.User;
import jakarta.persistence.*;

@Entity
@Table(name = "user_progress")
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course activeCourse;

    @Column(nullable = false)
    private int hearts;

    @Column(nullable = false)
    private int points;

    public UserProgress() {
    }

    public UserProgress(User _user, Course _activCourse, int _hearts, int _points) {
        this.user = _user;
        this.activeCourse = _activCourse;
        this.hearts = _hearts;
        this.points = _points;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Course getActiveCourse() {
        return activeCourse;
    }

    public int getHearts() {
        return hearts;
    }

    public int getPoints() {
        return points;
    }

    public void setId(Long _id) {
        this.id = _id;
    }

    public void setUser(User _user) {
        this.user = _user;
    }

    public void setActiveCourse(Course _activeCourse) {
        this.activeCourse = _activeCourse;
    }

    public void setHearts(int _hearts) {
        this.hearts = _hearts;
    }

    public void setPoints(int _points) {
        this.points = _points;
    }
}
