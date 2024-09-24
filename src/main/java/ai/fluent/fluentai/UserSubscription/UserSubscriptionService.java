package ai.fluent.fluentai.UserSubscription;

import ai.fluent.fluentai.User.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class UserSubscriptionService {

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<UserSubscription> createUserSubscription(UserSubscriptionDTO userSubscriptionDTO) {
        Optional<User> user = userRepository.findById(userSubscriptionDTO.getUserId());

        if (user.isPresent()) {
            UserSubscription userSubscription = new UserSubscription();
            userSubscription.setUser(user.get());
            userSubscription.setStripeCustomerId(userSubscriptionDTO.getStripeCustomerId());
            userSubscription.setStripeSubscriptionId(userSubscriptionDTO.getStripeSubscriptionId());
            userSubscription.setStripePriceId(userSubscriptionDTO.getStripePriceId());
            userSubscription.setStripeCurrentPeriodEnd(userSubscriptionDTO.getStripeCurrentPeriodEnd());
            userSubscription.setIsActive(userSubscriptionDTO.getIsActive());
            return Optional.of(userSubscriptionRepository.save(userSubscription));
        }
        return Optional.empty();
    }

    public Optional<UserSubscription> updateUserSubscription(int id, UserSubscriptionDTO userSubscriptionDTO) {
        Optional<UserSubscription> existingUserSubscription = userSubscriptionRepository.findById(id);
        if (existingUserSubscription.isPresent()) {
            UserSubscription userSubscription = existingUserSubscription.get();

            Optional<User> user = userRepository.findById(userSubscriptionDTO.getUserId());

            if (user.isPresent()) {
                userSubscription.setUser(user.get());
                userSubscription.setStripeCustomerId(userSubscriptionDTO.getStripeCustomerId());
                userSubscription.setStripeSubscriptionId(userSubscriptionDTO.getStripeSubscriptionId());
                userSubscription.setStripePriceId(userSubscriptionDTO.getStripePriceId());
                userSubscription.setStripeCurrentPeriodEnd(userSubscriptionDTO.getStripeCurrentPeriodEnd());
                userSubscription.setIsActive(userSubscriptionDTO.getIsActive());
                return Optional.of(userSubscriptionRepository.save(userSubscription));
            }
        }
        return Optional.empty();
    }

    public List<UserSubscription> getUserSubscriptionByUserId(String userId) {
        return userSubscriptionRepository.findByUserId(userId);
    }

    public List<UserSubscription> getAllUserSubscriptions() {
        return userSubscriptionRepository.findAll();
    }

    public List<UserSubscription> getAllUserSubscriptions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userSubscriptionRepository.findAll(pageable).getContent();
    }

    public long countUserSubscriptions() {
        return userSubscriptionRepository.count();
    }

    public Optional<UserSubscription> getUserSubscriptionById(int id) {
        return userSubscriptionRepository.findById(id);
    }

    public void deleteUserSubscription(int id) {
        userSubscriptionRepository.deleteById(id);
    }
}
