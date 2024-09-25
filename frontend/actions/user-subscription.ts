import { useAuth, useUser } from "@clerk/nextjs";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { apiFetch } from "@/lib/apiService";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = useAuth(); 
  const { user } = useUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  // Fetch user subscription from the backend
  const userSubscription = await apiFetch(`/user-subscriptions/${userId}`);

  // Redirect user to customer portal if they already have a subscription
  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  // Create a new Stripe checkout session for subscription
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "FluentAI Pro",
            description: "Unlimited hearts.",
          },
          unit_amount: 2000, // $20.00 USD
          recurring: {
            interval: "month",
          },
        },
      },
    ],
    metadata: {
      userId,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return { data: stripeSession.url };
};
