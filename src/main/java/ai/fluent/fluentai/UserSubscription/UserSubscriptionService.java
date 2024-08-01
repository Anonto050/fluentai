package ai.fluent.fluentai.UserSubscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserSubscriptionService {

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;

    public List<UserSubscription> getAllUserSubscriptions() {
        return userSubscriptionRepository.findAll();
    }

    public Optional<UserSubscription> getUserSubscriptionById(int _id) {
        return userSubscriptionRepository.findById(_id);
    }

    public UserSubscription addUserSubscription(UserSubscription _userSubscription) {
        return userSubscriptionRepository.save(_userSubscription);
    }

    public void deleteUserSubscription(int _id) {
        userSubscriptionRepository.deleteById(_id);
    }
}
