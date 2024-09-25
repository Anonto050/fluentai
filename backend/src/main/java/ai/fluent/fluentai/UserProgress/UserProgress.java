package ai.fluent.fluentai.UserProgress;

import ai.fluent.fluentai.Course.Course;
import ai.fluent.fluentai.User.User;
import ai.fluent.fluentai.Lesson.Lesson;
import jakarta.persistence.*;

@Entity
@Table(name = "user_progress")
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course activeCourse;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson activeLesson;

    @Column(nullable = false)
    private int completedChallenges;

    @Column(nullable = false)
    private int hearts;

    @Column(nullable = false)
    private int points;

    public UserProgress() {
    }

    public UserProgress(User _user, Course _activCourse, Lesson _activeLesson, int _completedChallenges, int _hearts,
            int _points) {
        this.user = _user;
        this.activeCourse = _activCourse;
        this.activeLesson = _activeLesson;
        this.completedChallenges = _completedChallenges;
        this.hearts = _hearts;
        this.points = _points;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Course getActiveCourse() {
        return activeCourse;
    }

    public Lesson getActiveLesson() {
        return activeLesson;
    }

    public int getCompletedChallenges() {
        return completedChallenges;
    }

    public int getHearts() {
        return hearts;
    }

    public int getPoints() {
        return points;
    }

    public void setId(int _id) {
        this.id = _id;
    }

    public void setUser(User _user) {
        this.user = _user;
    }

    public void setActiveCourse(Course _activeCourse) {
        this.activeCourse = _activeCourse;
    }

    public void setActiveLesson(Lesson _activeLesson) {
        this.activeLesson = _activeLesson;
    }

    public void setCompletedChallenges(int _completedChallenges) {
        this.completedChallenges = _completedChallenges;
    }

    public void setHearts(int _hearts) {
        this.hearts = _hearts;
    }

    public void setPoints(int _points) {
        this.points = _points;
    }
}
