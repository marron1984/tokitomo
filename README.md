# TOKI & TOMO — Japanese Stationery Subscription

Curated Japanese stationery delivered monthly. Stationery for your quiet time.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: Tailwind CSS + shadcn/ui components
- **Auth**: Auth.js v5 (NextAuth) with Resend magic link
- **Database**: PostgreSQL + Prisma ORM
- **Payments**: Stripe (Checkout + Customer Portal + Webhooks)
- **i18n**: next-intl (EN / FR / JA)

## Quick Start

### 1. Prerequisites

- Node.js 18+
- Docker (for local PostgreSQL)
- Stripe CLI (for webhook testing)
- Resend account (for magic link emails)

### 2. Clone & Install

```bash
git clone <repo-url> tokitomo
cd tokitomo
cp .env.example .env
npm install
```

### 3. Configure Environment Variables

Edit `.env` with your values:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth.js — generate with: openssl rand -base64 32
AUTH_SECRET=<your-auth-secret>
AUTH_RESEND_KEY=<your-resend-api-key>

# Database
DATABASE_URL=postgresql://tokitomo:tokitomo@localhost:5432/tokitomo

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  (from stripe listen output)
STRIPE_PRICE_MONTHLY_50=price_...
STRIPE_PRICE_SHIPPING_FLAT_10=price_...
STRIPE_PORTAL_CONFIGURATION_ID=   (optional)

# Admin
ADMIN_EMAIL_ALLOWLIST=your@email.com

# A/B Testing
NEXT_PUBLIC_HERO_VARIANT=A
```

### 4. Stripe Setup

#### Create Products & Prices

In the [Stripe Dashboard](https://dashboard.stripe.com/test/products):

1. **Create Product: "TOKI & TOMO Membership"**
   - Add a recurring Price: **$50.00 / month**
   - Copy the Price ID → `STRIPE_PRICE_MONTHLY_50`

2. **Create Product: "Flat-rate Shipping"**
   - Add a recurring Price: **$10.00 / month**
   - Copy the Price ID → `STRIPE_PRICE_SHIPPING_FLAT_10`

#### Configure Customer Portal

In [Stripe Settings > Customer Portal](https://dashboard.stripe.com/test/settings/billing/portal):

1. Enable "Cancel subscriptions"
2. Enable "Update payment method"
3. Enable "View invoices"
4. Optionally copy the Configuration ID → `STRIPE_PORTAL_CONFIGURATION_ID`

#### Configure Webhooks (Production)

In [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks):

1. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
2. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
3. Copy the Signing Secret → `STRIPE_WEBHOOK_SECRET`

### 5. Start Database

```bash
docker compose up -d
```

### 6. Initialize Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 7. Start Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 8. Local Webhook Testing

In a separate terminal:

```bash
npm run stripe:listen
```

This runs `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.
Copy the webhook signing secret from the output to `STRIPE_WEBHOOK_SECRET` in `.env`.

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set all environment variables from `.env.example`
4. Set `DATABASE_URL` to your production PostgreSQL (Neon, Supabase, etc.)
5. Configure Stripe webhook endpoint with your production URL
6. Deploy

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-prefixed pages
│   │   ├── page.tsx       # Home
│   │   ├── app/           # Auth-protected member area
│   │   ├── admin/         # Admin-protected dashboard
│   │   └── auth/          # Sign in / verify
│   └── api/               # API routes (no locale prefix)
├── components/
│   ├── ui/                # shadcn/ui components
│   └── marketing/         # Marketing page components
├── lib/                   # Server utilities
│   ├── auth.ts            # Auth.js configuration
│   ├── stripe.ts          # Stripe utilities
│   ├── subscription.ts    # Subscription gating logic
│   └── analytics.ts       # Client-side analytics
└── i18n/                  # next-intl configuration
```

## Key Flows

### Subscription Checkout
1. User clicks Subscribe → `/app/subscribe`
2. App layout checks auth → redirects to sign in if needed
3. Subscribe page → POST `/api/stripe/checkout`
4. Stripe Checkout with 2 line items ($50 membership + $10 shipping)
5. On success → `/app/success` → Style Quiz → Address Onboarding
6. Webhook confirms subscription → DB updated

### Gating Logic
- **Marketing pages**: Public
- **`/app/*` routes**: Require authentication (checked in layout)
- **Ritual/Vault/Referrals**: Require `active` subscription status
- **`/admin/*` routes**: Require auth + email in `ADMIN_EMAIL_ALLOWLIST`

### A/B Hero Variants
- Set `NEXT_PUBLIC_HERO_VARIANT=A` (default) or `B`
- Override per-user: `?v=B` stores in cookie
- Variant A: Warm kawaii tone
- Variant B: Minimal utilitarian tone
- All events include variant for funnel analysis

## Admin

Access at `/{locale}/admin` (must be in `ADMIN_EMAIL_ALLOWLIST`).

- **Dashboard**: Subscriber count, CRO funnel, subsidy analytics
- **Subscribers**: Full subscriber list with status, style, country, flags
- **CSV Export**: Download fulfillment export at `/api/admin/export/csv`
- **Cost Recording**: Record actual shipping costs for subsidy tracking
