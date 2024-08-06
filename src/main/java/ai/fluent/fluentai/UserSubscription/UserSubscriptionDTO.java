package ai.fluent.fluentai.UserSubscription;

import java.time.LocalDateTime;

public class UserSubscriptionDTO {

    private int userId;
    private String stripeCustomerId;
    private String stripeSubscriptionId;
    private String stripePriceId;
    private LocalDateTime stripeCurrentPeriodEnd;
    private boolean isActive;

    public UserSubscriptionDTO() {
    }

    public UserSubscriptionDTO(int _userId, String _stripeCustomerId, String _stripeSubscriptionId,
            String _stripePriceId,
            LocalDateTime _stripeCurrentPeriodEnd, boolean _isActive) {
        this.userId = _userId;
        this.stripeCustomerId = _stripeCustomerId;
        this.stripeSubscriptionId = _stripeSubscriptionId;
        this.stripePriceId = _stripePriceId;
        this.stripeCurrentPeriodEnd = _stripeCurrentPeriodEnd;
        this.isActive = _isActive;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int _userId) {
        this.userId = _userId;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(String _stripeCustomerId) {
        this.stripeCustomerId = _stripeCustomerId;
    }

    public String getStripeSubscriptionId() {
        return stripeSubscriptionId;
    }

    public void setStripeSubscriptionId(String _stripeSubscriptionId) {
        this.stripeSubscriptionId = _stripeSubscriptionId;
    }

    public String getStripePriceId() {
        return stripePriceId;
    }

    public void setStripePriceId(String _stripePriceId) {
        this.stripePriceId = _stripePriceId;
    }

    public LocalDateTime getStripeCurrentPeriodEnd() {
        return stripeCurrentPeriodEnd;
    }

    public void setStripeCurrentPeriodEnd(LocalDateTime _stripeCurrentPeriodEnd) {
        this.stripeCurrentPeriodEnd = _stripeCurrentPeriodEnd;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean _isActive) {
        this.isActive = _isActive;
    }
}
