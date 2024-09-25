package ai.fluent.fluentai.Unit;

public class UnitDTO {

    private Integer id;
    private String title;
    private String description;
    private Integer order;
    private Integer courseId;

    public UnitDTO() {
    }

    public UnitDTO(String _title, String _description, Integer _order, Integer _courseId) {
        this.title = _title;
        this.description = _description;
        this.order = _order;
        this.courseId = _courseId;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String _description) {
        this.description = _description;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer _order) {
        this.order = _order;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer _courseId) {
        this.courseId = _courseId;
    }
}
