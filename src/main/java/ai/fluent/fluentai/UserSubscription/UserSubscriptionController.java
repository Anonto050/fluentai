package ai.fluent.fluentai.UserSubscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/userSubscriptions")
public class UserSubscriptionController {

    @Autowired
    private UserSubscriptionService userSubscriptionService;

    @GetMapping
    public List<UserSubscription> getAllUserSubscriptions() {
        return userSubscriptionService.getAllUserSubscriptions();
    }

    @GetMapping("/{id}")
    public Optional<UserSubscription> getUserSubscriptionById(@PathVariable int _id) {
        return userSubscriptionService.getUserSubscriptionById(_id);
    }

    @PostMapping
    public UserSubscription addUserSubscription(@RequestBody UserSubscription _userSubscription) {
        return userSubscriptionService.addUserSubscription(_userSubscription);
    }

    @DeleteMapping("/{id}")
    public void deleteUserSubscription(@PathVariable int _id) {
        userSubscriptionService.deleteUserSubscription(_id);
    }
}
