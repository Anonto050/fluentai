package ai.fluent.fluentai.Message;

import java.time.LocalDateTime;

public class MessageDTO {

    private Integer id;
    private String senderId;
    private String receiverId;
    private LocalDateTime timestamp;
    private String content;

    public MessageDTO() {
    }

    public MessageDTO(Integer _id, String _senderId, String _receiverId, LocalDateTime _timestamp, String _content) {
        this.id = _id;
        this.senderId = _senderId;
        this.receiverId = _receiverId;
        this.timestamp = _timestamp;
        this.content = _content;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer _id) {
        this.id = _id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String _senderId) {
        this.senderId = _senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String _receiverId) {
        this.receiverId = _receiverId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime _timestamp) {
        this.timestamp = _timestamp;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String _content) {
        this.content = _content;
    }
}
