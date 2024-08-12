"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

export default function Button({ planId }) {
  const user = useSelector((state) => state.auth.user);

  const handleSubscriptionButton = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId,
            stripeCustomerId: user?.stripeCustomerId,
          }),
        }
      );
      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className="rounded-full text-white mx-auto md:mx-0 bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
      onClick={handleSubscriptionButton}
    >
      Buy plan
    </button>
  );
}
