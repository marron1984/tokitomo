import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

export async function createCheckoutSession({
  userId,
  email,
  locale,
  stripeCustomerId,
}: {
  userId: string;
  email: string;
  locale: string;
  stripeCustomerId?: string;
}) {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_MONTHLY_50!,
        quantity: 1,
      },
      {
        price: process.env.STRIPE_PRICE_SHIPPING_FLAT_10!,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/${locale}/app/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/${locale}/app/subscribe?canceled=true`,
    metadata: { userId },
    allow_promotion_codes: false,
  };

  if (stripeCustomerId) {
    params.customer = stripeCustomerId;
  } else {
    params.customer_email = email;
  }

  return stripe.checkout.sessions.create(params);
}

export async function createCustomerPortalSession({
  stripeCustomerId,
  locale,
}: {
  stripeCustomerId: string;
  locale: string;
}) {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const params: Stripe.BillingPortal.SessionCreateParams = {
    customer: stripeCustomerId,
    return_url: `${baseUrl}/${locale}/app/account`,
  };

  if (process.env.STRIPE_PORTAL_CONFIGURATION_ID) {
    params.configuration = process.env.STRIPE_PORTAL_CONFIGURATION_ID;
  }

  return stripe.billingPortal.sessions.create(params);
}
