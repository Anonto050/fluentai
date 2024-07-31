package ai.fluent.fluentai.Unit;

import ai.fluent.fluentai.Course.Course;
import ai.fluent.fluentai.Lesson.Lesson;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "units")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer courseId;

    @Column(name = "unit_order", nullable = false)
    private Integer order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseId", nullable = false, insertable = false, updatable = false)
    private Course course;

    @OneToMany(mappedBy = "unit", fetch = FetchType.LAZY)
    private List<Lesson> lessons;

    public Unit() {
    }

    public Unit(String _title, String _description, Integer _courseId, Integer _order) {
        this.title = _title;
        this.description = _description;
        this.courseId = _courseId;
        this.order = _order;
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

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer _courseId) {
        this.courseId = _courseId;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer _order) {
        this.order = _order;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course _course) {
        this.course = _course;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> _lessons) {
        this.lessons = _lessons;
    }

    @Override
    public String toString() {
        return "Unit{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", courseId=" + courseId +
                ", order=" + order +
                '}';
    }

    @Override
    public boolean equals(Object _obj) {
        if (this == _obj)
            return true;
        if (_obj == null || getClass() != _obj.getClass())
            return false;
        Unit unit = (Unit) _obj;
        return Objects.equals(id, unit.id) &&
                Objects.equals(title, unit.title) &&
                Objects.equals(description, unit.description) &&
                Objects.equals(courseId, unit.courseId) &&
                Objects.equals(order, unit.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, courseId, order);
    }
}
