package ai.fluent.fluentai.UserSubscription;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

import ai.fluent.fluentai.User.User;

@Entity
public class UserSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User user;

    private String stripeCustomerId;
    private String stripeSubscriptionId;
    private String stripePriceId;
    private LocalDateTime stripeCurrentPeriodEnd;
    private boolean isActive;

    public UserSubscription() {
    }

    public UserSubscription(User _user, String _stripeCustomerId, String _stripeSubscriptionId, String _stripePriceId,
            LocalDateTime _stripeCurrentPeriodEnd, boolean _isActive) {
        this.user = _user;
        this.stripeCustomerId = _stripeCustomerId;
        this.stripeSubscriptionId = _stripeSubscriptionId;
        this.stripePriceId = _stripePriceId;
        this.stripeCurrentPeriodEnd = _stripeCurrentPeriodEnd;
        this.isActive = _isActive;
    }

    public int getId() {
        return id;
    }

    public void setId(int _id) {
        this.id = _id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User _user) {
        this.user = _user;
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

    @Override
    public String toString() {
        return "UserSubscription{" +
                "id=" + id +
                ", user=" + user +
                ", stripeCustomerId='" + stripeCustomerId + '\'' +
                ", stripeSubscriptionId='" + stripeSubscriptionId + '\'' +
                ", stripePriceId='" + stripePriceId + '\'' +
                ", stripeCurrentPeriodEnd=" + stripeCurrentPeriodEnd +
                ", isActive=" + isActive +
                '}';
    }

    @Override
    public boolean equals(Object _o) {
        if (this == _o)
            return true;
        if (_o == null || getClass() != _o.getClass())
            return false;
        UserSubscription that = (UserSubscription) _o;
        return id == that.id && isActive == that.isActive && Objects.equals(user, that.user)
                && Objects.equals(stripeCustomerId, that.stripeCustomerId)
                && Objects.equals(stripeSubscriptionId, that.stripeSubscriptionId)
                && Objects.equals(stripePriceId, that.stripePriceId)
                && Objects.equals(stripeCurrentPeriodEnd, that.stripeCurrentPeriodEnd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, stripeCustomerId, stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd,
                isActive);
    }
}
