package ai.fluent.fluentai.Lesson;

public class LessonDTO {

    private Integer id;
    private String title;
    private Integer order;
    private Integer unitId;

    public LessonDTO() {
    }

    public LessonDTO(String _title, Integer _order, Integer _unitId) {
        this.title = _title;
        this.order = _order;
        this.unitId = _unitId;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer _id) {
        this.id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String _title) {
        this.title = _title;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer _order) {
        this.order = _order;
    }

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer _unitId) {
        this.unitId = _unitId;
    }
}
