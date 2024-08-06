package ai.fluent.fluentai.User;

public class UserDTO {

    private Integer id;
    private String username;
    private String email;
    private String password;
    private String name;
    private String photoUrl;
    private int nativeLangId;

    public UserDTO() {
    }

    public UserDTO(String _username, String _email, String _password, String _name, String _photoUrl,
            int _nativeLangId) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.name = _name;
        this.photoUrl = _photoUrl;
        this.nativeLangId = _nativeLangId;
    }

    public Integer getId() {
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

    public int getNativeLangId() {
        return nativeLangId;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public void setNativeLangId(int _nativeLangId) {
        this.nativeLangId = _nativeLangId;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                ", nativeLangId=" + nativeLangId +
                '}';
    }

    @Override
    public boolean equals(Object _o) {
        if (this == _o)
            return true;
        if (_o == null || getClass() != _o.getClass())
            return false;

        UserDTO userDTO = (UserDTO) _o;

        return id != null ? id.equals(userDTO.id) : userDTO.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}