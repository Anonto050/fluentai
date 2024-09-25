import { useAuth, useUser } from "@clerk/nextjs";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { apiFetch } from "@/lib/apiService";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = useAuth(); 
  const { user } = useUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  // let userSubscription;

  // try {
  //   // Fetch user subscription from the backend
  //   userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  // } catch (error) {
  //   // Log error or handle it gracefully
  //   console.error("No active subscription found, proceeding with Stripe checkout:", error);
  //   userSubscription = null;
  // }

  // // If the user has an active subscription, redirect them to the Stripe customer portal
  // if (userSubscription && userSubscription.stripeCustomerId) {
  //   const stripeSession = await stripe.billingPortal.sessions.create({
  //     customer: userSubscription.stripeCustomerId,
  //     return_url: returnUrl,
  //   });

  //   return { data: stripeSession.url };
  // }

  // If the user does not have a subscription, create a new Stripe checkout session for subscription
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
