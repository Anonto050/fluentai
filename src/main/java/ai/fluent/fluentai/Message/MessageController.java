package ai.fluent.fluentai.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageDTO> createMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.createMessage(messageDTO)
                .map(message -> ResponseEntity.ok(convertToDTO(message)))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageDTO> updateMessage(@PathVariable Integer id, @RequestBody MessageDTO messageDTO) {
        return messageService.updateMessage(id, messageDTO)
                .map(message -> ResponseEntity.ok(convertToDTO(message)))
                .orElse(ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Integer id) {
        if (messageService.deleteMessage(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/between/{senderId}/{receiverId}")
    public ResponseEntity<List<MessageDTO>> getMessagesBySenderAndReceiverId(
            @PathVariable Integer senderId,
            @PathVariable Integer receiverId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<Message> messages = messageService.getMessagesBySenderAndReceiverId(senderId, receiverId, page, size);
        int totalMessages = messageService.getTotalMessagesBySenderAndReceiverId(senderId, receiverId);

        List<MessageDTO> messageDTOs = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // Calculate the range
        int start = page * size;
        int end = Math.min((page + 1) * size - 1, totalMessages - 1);

        // Create headers and add Content-Range header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "messages " + start + "-" + end + "/" + totalMessages);

        return new ResponseEntity<>(messageDTOs, headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable Integer id) {
        return messageService.getMessageById(id)
                .map(message -> ResponseEntity.ok(convertToDTO(message)))
                .orElse(ResponseEntity.notFound().build());
    }

    private MessageDTO convertToDTO(Message message) {
        return new MessageDTO(
                message.getId(),
                message.getSender().getId(),
                message.getReceiver().getId(),
                message.getTimestamp(),
                message.getContent());
    }
}
