package ai.fluent.fluentai.Message;

import ai.fluent.fluentai.User.User;
import ai.fluent.fluentai.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<Message> createMessage(MessageDTO messageDTO) {
        Optional<User> senderOptional = userRepository.findById(messageDTO.getSenderId());
        Optional<User> receiverOptional = userRepository.findById(messageDTO.getReceiverId());
        if (senderOptional.isPresent() && receiverOptional.isPresent()) {
            User sender = senderOptional.get();
            User receiver = receiverOptional.get();
            Message message = new Message(sender, receiver, LocalDateTime.now(), messageDTO.getContent());
            return Optional.of(messageRepository.save(message));
        }
        return Optional.empty();
    }

    public Optional<Message> updateMessage(Integer id, MessageDTO messageDTO) {
        return messageRepository.findById(id).map(message -> {
            Optional<User> senderOptional = userRepository.findById(messageDTO.getSenderId());
            Optional<User> receiverOptional = userRepository.findById(messageDTO.getReceiverId());
            if (senderOptional.isPresent() && receiverOptional.isPresent()) {
                message.setSender(senderOptional.get());
                message.setReceiver(receiverOptional.get());
                message.setContent(messageDTO.getContent());
                message.setTimestamp(LocalDateTime.now());
                return messageRepository.save(message);
            }
            return message;
        });
    }

    public boolean deleteMessage(Integer id) {
        if (messageRepository.existsById(id)) {
            messageRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Message> getMessagesBySenderAndReceiverId(String senderId, String receiverId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId, pageable).getContent();
    }

    public int getTotalMessagesBySenderAndReceiverId(String senderId, String receiverId) {
        return (int) messageRepository.countBySenderIdAndReceiverId(senderId, receiverId);
    }

    public Optional<Message> getMessageById(Integer id) {
        return messageRepository.findById(id);
    }
}
