package ai.fluent.fluentai.Unit;

import ai.fluent.fluentai.Course.Course;
import ai.fluent.fluentai.Lesson.Lesson;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @Column(name = "unit_order", nullable = false)
    private Integer order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference
    private Course course;

    @OneToMany(mappedBy = "unit", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Lesson> lessons;

    public Unit() {
    }

    public Unit(String _title, String _description, Integer _order, Course _course) {
        this.title = _title;
        this.description = _description;
        this.order = _order;
        this.course = _course;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
                Objects.equals(order, unit.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, order);
    }
}
