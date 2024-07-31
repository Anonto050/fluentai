package ai.fluent.fluentai.Course;

import ai.fluent.fluentai.Unit.Unit;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageSrc;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Unit> units;

    public Course() {
    }

    public Course(String _title, String _imageSrc) {
        this.title = _title;
        this.imageSrc = _imageSrc;
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

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String _imageSrc) {
        this.imageSrc = _imageSrc;
    }

    public List<Unit> getUnits() {
        return units;
    }

    public void setUnits(List<Unit> _units) {
        this.units = _units;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", imageSrc='" + imageSrc + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object _obj) {
        if (this == _obj)
            return true;
        if (_obj == null || getClass() != _obj.getClass())
            return false;
        Course course = (Course) _obj;
        return Objects.equals(id, course.id) &&
                Objects.equals(title, course.title) &&
                Objects.equals(imageSrc, course.imageSrc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, imageSrc);
    }
}
