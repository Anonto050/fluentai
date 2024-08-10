package ai.fluent.fluentai.UserSubscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/user-subscriptions")
public class UserSubscriptionController {

    @Autowired
    private UserSubscriptionService userSubscriptionService;

    @GetMapping
    public ResponseEntity<List<UserSubscription>> getAllUserSubscriptions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<UserSubscription> userSubscriptions = userSubscriptionService.getAllUserSubscriptions(page, size);
        long totalUserSubscriptions = userSubscriptionService.countUserSubscriptions();

        long start = page * size;
        long end = Math.min((page + 1) * size - 1, totalUserSubscriptions - 1);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range",
                "user-subscriptions " + start + "-" + end + "/" + totalUserSubscriptions);

        return new ResponseEntity<>(userSubscriptions, headers, HttpStatus.OK);

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
