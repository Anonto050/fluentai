package ai.fluent.fluentai.Message;

import ai.fluent.fluentai.User.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private String content;

    public Message() {
    }

    public Message(User _sender, User _receiver, LocalDateTime _timestamp, String _content) {
        this.sender = _sender;
        this.receiver = _receiver;
        this.timestamp = _timestamp;
        this.content = _content;
    }

    public Integer getId() {
        return id;
    }

    public User getSender() {
        return sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getContent() {
        return content;
    }

    public void setId(Integer _id) {
        this.id = _id;
    }

    public void setSender(User _sender) {
        this.sender = _sender;
    }

    public void setReceiver(User _receiver) {
        this.receiver = _receiver;
    }

    public void setTimestamp(LocalDateTime _timestamp) {
        this.timestamp = _timestamp;
    }

    public void setContent(String _content) {
        this.content = _content;
    }
}
