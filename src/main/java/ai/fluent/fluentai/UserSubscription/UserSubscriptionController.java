package ai.fluent.fluentai.UserSubscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/v1/user-subscriptions")
public class UserSubscriptionController {

    @Autowired
    private UserSubscriptionService userSubscriptionService;

    @GetMapping
    public List<UserSubscription> getAllUserSubscriptions() {
        return userSubscriptionService.getAllUserSubscriptions();
    }

    @GetMapping("/{id}")
    public Optional<UserSubscription> getUserSubscriptionById(@PathVariable int id) {
        return userSubscriptionService.getUserSubscriptionById(id);
    }

    @PostMapping
    public ResponseEntity<UserSubscription> createUserSubscription(
            @RequestBody UserSubscriptionDTO userSubscriptionDTO) {
        return userSubscriptionService.createUserSubscription(userSubscriptionDTO)
                .map(userSubscription -> ResponseEntity.ok(userSubscription))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSubscription> updateUserSubscription(@PathVariable int id,
            @RequestBody UserSubscriptionDTO userSubscriptionDTO) {
        return userSubscriptionService.updateUserSubscription(id, userSubscriptionDTO)
                .map(userSubscription -> ResponseEntity.ok(userSubscription))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteUserSubscription(@PathVariable int id) {
        userSubscriptionService.deleteUserSubscription(id);
    }
}
