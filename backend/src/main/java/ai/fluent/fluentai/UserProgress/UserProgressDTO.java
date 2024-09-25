package ai.fluent.fluentai.UserProgress;

public class UserProgressDTO {

    private int id;
    private String userId;
    private int activeCourseId;
    private int activeLessonId;
    private int completedChallenges;
    private int hearts;
    private int points;

    public UserProgressDTO() {
    }

    public UserProgressDTO(int _id, String _userId, int _activeCourseId, int _activeLessonId, int _completedChallenges,
            int _hearts, int _points) {
        this.id = _id;
        this.userId = _userId;
        this.activeCourseId = _activeCourseId;
        this.activeLessonId = _activeLessonId;
        this.completedChallenges = _completedChallenges;
        this.hearts = _hearts;
        this.points = _points;
    }

    public UserProgressDTO(UserProgress userProgress) {
        this.id = userProgress.getId();
        this.userId = userProgress.getUser().getId();
        this.activeCourseId = userProgress.getActiveCourse().getId();
        this.activeLessonId = userProgress.getActiveLesson().getId();
        this.completedChallenges = userProgress.getCompletedChallenges();
        this.hearts = userProgress.getHearts();
        this.points = userProgress.getPoints();
    }

    public int getId() {
        return id;
    }

    public void setId(int _id) {
        this.id = _id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String _userId) {
        this.userId = _userId;
    }

    public int getActiveCourseId() {
        return activeCourseId;
    }

    public void setActiveCourseId(int _activeCourseId) {
        this.activeCourseId = _activeCourseId;
    }

    public int getActiveLessonId() {
        return activeLessonId;
    }

    public void setActiveLessonId(int _activeLessonId) {
        this.activeLessonId = _activeLessonId;
    }

    public int getCompletedChallenges() {
        return completedChallenges;
    }

    public void setCompletedChallenges(int _completedChallenges) {
        this.completedChallenges = _completedChallenges;
    }

    public int getHearts() {
        return hearts;
    }

    public void setHearts(int _hearts) {
        this.hearts = _hearts;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int _points) {
        this.points = _points;
    }
}
