package ai.fluent.fluentai.UserProgress;

public class UserProgressDTO {

    private int userId;
    private int hearts;
    private int points;

    public UserProgressDTO() {
    }

    public UserProgressDTO(int _userId, int _hearts, int _points) {
        this.userId = _userId;
        this.hearts = _hearts;
        this.points = _points;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int _userId) {
        this.userId = _userId;
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
