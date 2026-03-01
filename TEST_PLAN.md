# Test Plan — TOKI & TOMO

## 1. Subscription Checkout (Success)

1. Start dev server and Stripe CLI listener
2. Navigate to `/en/app/subscribe`
3. Should redirect to `/en/auth/signin` (not authenticated)
4. Enter email, receive magic link, click to authenticate
5. Return to `/en/app/subscribe`
6. Click "Proceed to Checkout"
7. Verify Stripe Checkout has **two line items**: $50 membership + $10 shipping = $60 total
8. Complete checkout with test card `4242 4242 4242 4242`
9. Verify redirect to `/en/app/success`
10. Check Stripe CLI output for webhook events:
    - `checkout.session.completed`
    - `customer.subscription.created`
    - `invoice.paid`
11. Verify DB: `Subscription` record has `status: "active"`, `StripeCustomer` record exists
12. Navigate to `/en/app/account` → verify "Active" badge shown

## 2. Subscription Checkout (Cancel)

1. From `/en/app/subscribe`, click "Proceed to Checkout"
2. On Stripe Checkout page, click back/close
3. Verify redirect to `/en/app/subscribe?canceled=true`
4. Verify yellow banner "Checkout was canceled" is displayed
5. Verify analytics event `checkout_cancel` is logged (check DB)

## 3. Webhook Signature Verification

1. Send a POST to `/api/webhooks/stripe` with a fake body and no `stripe-signature` header
2. Expect 400 response with "Missing signature"
3. Send a POST with a body and invalid `stripe-signature`
4. Expect 400 response with "Invalid signature"
5. Send a valid event via Stripe CLI `stripe trigger checkout.session.completed`
6. Expect 200 response

## 4. Webhook Idempotency

1. Trigger a webhook event via Stripe CLI
2. Verify `WebhookEvent` record created in DB with the `stripeEventId`
3. Replay the same event (Stripe CLI: `stripe events resend evt_...`)
4. Verify the webhook returns 200 with `duplicate: true`
5. Verify no duplicate processing occurred (check subscription record unchanged)

## 5. Gating & Onboarding

1. **No auth**: Visit `/en/app/ritual` → should redirect to `/en/auth/signin`
2. **Auth, no subscription**: Visit `/en/app/ritual` → should show "Active subscription required" locked state
3. **Auth, active subscription**: Visit `/en/app/ritual` → should show weekly prompts
4. **Onboarding flow**:
   - After checkout success, navigate to style quiz
   - Select a style → verify `preferenceStyle` updated in DB
   - Continue to address form
   - Fill in address → verify `Address` record created in DB
   - Verify `address_completed` analytics event logged
5. **Account page**:
   - Without address: shows "Not ready to ship" warning
   - With address: shows full address with edit button

## 6. i18n Routing & Language Switch

1. Visit `/` → should redirect to `/en`
2. Visit `/fr` → should show French content (all nav, hero, FAQ in French)
3. Visit `/ja` → should show Japanese content
4. Use language switcher in header:
   - Click "FR" → URL changes to `/fr/...`, content updates to French
   - Click "JA" → URL changes to `/ja/...`, content updates to Japanese
5. Verify all pages render correctly in all 3 languages:
   - Home, How It Works, Pricing, FAQ, Shipping, Contact, Terms, Privacy, Replacement Policy
6. Verify metadata (page title, description) changes per locale
7. Verify Guardrail B text (shipping restrictions) appears in:
   - `/en/shipping-and-customs` ✓
   - `/en/faq` (Q6) ✓
   - `/en/legal/terms` ✓
   - NOT in hero section ✓

## 7. A/B Hero Variant Toggle

1. Visit `/en` → hero shows Variant A (warm kawaii) by default
2. Visit `/en?v=B` → hero switches to Variant B (minimal utilitarian)
3. Verify `tt_variant=B` cookie is set
4. Reload page without `?v=B` → still shows Variant B (from cookie)
5. Check `AnalyticsEvent` records: `page_view` events should have `variant: "B"`
6. Visit `/en?v=A` → switches back to Variant A
7. Set `NEXT_PUBLIC_HERO_VARIANT=B` in env → new sessions default to B

## 8. Analytics & Admin CRO Dashboard

1. Perform several actions: page views, CTA clicks, checkout
2. Navigate to `/en/admin`
3. Verify funnel shows correct counts:
   - page_view → cta_click → start_checkout → checkout_success → address_completed
4. Verify breakdown by locale shows data for visited locales
5. Verify breakdown by variant shows data for A and/or B

## 9. Referral Flow

1. User A (active subscriber) visits `/en/app/referrals`
2. Verify referral code is generated and displayed
3. Copy referral link
4. User B signs up and visits `/en/app/subscribe?ref=TOKI-XXXXXX`
5. User B applies the referral code via API
6. User B completes checkout
7. Verify `ReferralRedemption` created in DB
8. When `invoice.paid` webhook fires for User B:
   - `firstInvoicePaidAt` updated on the redemption
   - `FulfillmentFlag` with `WELCOME_BONUS` created for User B
   - `FulfillmentFlag` with `REFERRAL_BONUS` created for User A
9. Verify flags appear in admin subscriber list and CSV export

## 10. Subsidy Calculations

1. Create an Order record in DB (manual or via seed)
2. In admin dashboard, use the fulfillment cost form:
   - Enter order ID, carrier "DHL", service "Express", cost $18.50
3. Verify `FulfillmentCost` record created
4. Refresh admin dashboard:
   - Average shipping cost should reflect $18.50
   - Total subsidy should show $8.50 (18.50 - 10.00)
   - Gross margin estimate should adjust accordingly
5. Add more costs for different countries
6. Verify "Top Subsidy Countries" ranking updates

## 11. CSV Export

1. Navigate to `/en/admin`
2. Click "Export CSV"
3. Verify CSV downloads with correct filename format
4. Open CSV and verify columns:
   - user_id, email, name, style, subscription_status, stripe_subscription_id
   - country, line1, line2, city, state, postal_code
   - referral_code, referrals_count, fulfillment_flags
5. Verify fulfillment flags appear as `WELCOME_BONUS:2025-04|REFERRAL_BONUS:2025-04` format

## 12. Cancellation Deflection

1. Active subscriber visits `/en/app/account`
2. Click "Before you cancel..."
3. Verify FAQ accordion appears with pause/skip/progress questions
4. Click "I still want to cancel"
5. Verify redirect to Stripe Customer Portal
6. Complete cancellation in portal
7. Webhook fires: `customer.subscription.updated` (cancel_at_period_end) or `customer.subscription.deleted`
8. Verify DB subscription status updates
9. Verify account page shows "Canceled" or "Ends on [date]"

## 13. Edge Cases

- **Expired subscription**: User with `status: "canceled"` should see locked state on Ritual/Vault/Referrals
- **Payment failed**: `invoice.payment_failed` webhook should update `lastInvoiceStatus` to "failed"
- **Missing address**: Account page shows warning, but doesn't block app access
- **Double webhook**: Same event replayed should be handled idempotently
- **Invalid style quiz input**: API should reject values not in `[kawaii, minimal, traditional, study]`
- **Self-referral**: API should reject when user tries to use their own referral code

## 14. Responsive & Accessibility

1. Test all pages on mobile viewport (375px)
2. Verify sticky CTA appears on scroll on mobile
3. Verify mobile hamburger menu works
4. Check keyboard navigation on FAQ accordion
5. Verify form inputs have proper labels
6. Check color contrast meets WCAG AA minimum
