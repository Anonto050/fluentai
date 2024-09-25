import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_SECRET_KEY;

if (!stripeApiKey) {
  throw new Error("Stripe API secret key is not defined.");
}

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: "2024-06-20",
  typescript: true,
});
