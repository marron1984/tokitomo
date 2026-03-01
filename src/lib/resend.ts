import { Resend } from "resend";
import { prisma } from "./prisma";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.AUTH_RESEND_KEY);
  }
  return _resend;
}

const FROM = "TOKI & TOMO <noreply@tokitomo.com>";
const REPLY_TO = "hello@tokitomo.com";

async function canSendEmail(
  email: string,
  category: "emailShipping" | "emailMarketing" | "emailReferral"
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { emailShipping: true, emailMarketing: true, emailReferral: true },
  });
  if (!user) return true;
  return user[category] !== false;
}

// ── Welcome email (on first sign-up) ──────────────────────

export async function sendWelcomeEmail(email: string, name?: string | null) {
  const resend = getResend();
  const displayName = name || "friend";

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: email,
    subject: "Welcome to TOKI & TOMO — Your stationery journey begins",
    html: welcomeEmailHtml(displayName),
  });
}

// ── Subscription confirmed ─────────────────────────────────

export async function sendSubscriptionConfirmedEmail(
  email: string,
  name?: string | null
) {
  const resend = getResend();
  const displayName = name || "friend";

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: email,
    subject: "You're in! Your first TOKI & TOMO box is on its way",
    html: subscriptionConfirmedHtml(displayName),
  });
}

// ── Shipping notification ──────────────────────────────────

export async function sendShippingNotificationEmail(
  email: string,
  name: string | null,
  trackingNumber: string,
  carrier: string,
  month: string
) {
  if (!(await canSendEmail(email, "emailShipping"))) return;
  const resend = getResend();
  const displayName = name || "friend";

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: email,
    subject: `Your ${month} TOKI & TOMO box has shipped!`,
    html: shippingNotificationHtml(displayName, trackingNumber, carrier, month),
  });
}

// ── Referral bonus earned ──────────────────────────────────

export async function sendReferralBonusEmail(
  email: string,
  name: string | null,
  friendEmail: string
) {
  if (!(await canSendEmail(email, "emailReferral"))) return;
  const resend = getResend();
  const displayName = name || "friend";

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: email,
    subject: "Your referral bonus is ready!",
    html: referralBonusHtml(displayName, friendEmail),
  });
}

// ── Payment failed warning ─────────────────────────────────

export async function sendPaymentFailedEmail(
  email: string,
  name: string | null
) {
  const resend = getResend();
  const displayName = name || "friend";

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: email,
    subject: "Action needed — Your TOKI & TOMO payment couldn't be processed",
    html: paymentFailedHtml(displayName),
  });
}

// ── HTML Templates ─────────────────────────────────────────

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#FAF8F5;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <!-- Header -->
        <tr><td style="background-color:#FAF8F5;padding:32px 40px;text-align:center;border-bottom:1px solid #EDE9E3;">
          <p style="margin:0;font-size:22px;font-weight:600;color:#2C2825;letter-spacing:0.03em;">TOKI &amp; TOMO</p>
          <p style="margin:6px 0 0;font-size:11px;color:#9C958C;letter-spacing:0.15em;text-transform:uppercase;">Stationery from Japan</p>
        </td></tr>
        <!-- Content -->
        <tr><td style="padding:40px;">
          ${content}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;text-align:center;border-top:1px solid #EDE9E3;">
          <p style="margin:0;font-size:11px;color:#9C958C;">TOKI &amp; TOMO &bull; Curated Japanese stationery, delivered monthly</p>
          <p style="margin:8px 0 0;font-size:11px;color:#C4BEB5;">You received this because you signed up at tokitomo.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function welcomeEmailHtml(name: string): string {
  return baseLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#2C2825;">Welcome, ${name}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#6B645B;">
      We're so glad you're here. TOKI &amp; TOMO is a monthly invitation to slow down —
      to rediscover the quiet joy of putting pen to paper, of choosing the right sticker,
      of writing a letter that someone will keep.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#6B645B;">
      Each box is curated in Tokyo with care. Inside, you'll find items that blend
      beauty and function — the kind of stationery that makes the everyday feel special.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr><td style="background-color:#2C2825;border-radius:8px;padding:14px 32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://tokitomo.com'}/en/app/subscribe" style="color:#FAF8F5;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.03em;">Start Your Subscription</a>
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#9C958C;text-align:center;">
      Questions? Just reply to this email — we'd love to hear from you.
    </p>
  `);
}

function subscriptionConfirmedHtml(name: string): string {
  return baseLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#2C2825;">You're officially in, ${name}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#6B645B;">
      Your first TOKI &amp; TOMO box is being prepared. Our team in Tokyo is selecting
      items for this month's theme with you in mind.
    </p>
    <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#2C2825;">What happens next:</p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="padding:8px 0;font-size:14px;color:#6B645B;">
        <span style="color:#C4A882;font-weight:600;">01</span>&nbsp;&nbsp;Complete your style quiz so we can personalize your box
      </td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:#6B645B;">
        <span style="color:#C4A882;font-weight:600;">02</span>&nbsp;&nbsp;Add your shipping address
      </td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:#6B645B;">
        <span style="color:#C4A882;font-weight:600;">03</span>&nbsp;&nbsp;Your box ships within 5–7 business days
      </td></tr>
    </table>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr><td style="background-color:#2C2825;border-radius:8px;padding:14px 32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://tokitomo.com'}/en/app/onboarding/style-quiz" style="color:#FAF8F5;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.03em;">Take the Style Quiz</a>
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#9C958C;text-align:center;">
      We'll send you a shipping notification as soon as your box is on its way.
    </p>
  `);
}

function shippingNotificationHtml(
  name: string,
  trackingNumber: string,
  carrier: string,
  month: string
): string {
  return baseLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#2C2825;">Your ${month} box has shipped!</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#6B645B;">
      Hi ${name}, your curated stationery box is on its way.
      It's traveling from Tokyo to your doorstep — a little piece of Japan, just for you.
    </p>
    <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;background-color:#FAF8F5;border-radius:12px;padding:20px;">
      <tr><td style="padding:12px 20px;">
        <p style="margin:0 0 4px;font-size:11px;color:#9C958C;text-transform:uppercase;letter-spacing:0.1em;">Carrier</p>
        <p style="margin:0;font-size:15px;color:#2C2825;font-weight:600;">${carrier}</p>
      </td></tr>
      <tr><td style="padding:12px 20px;">
        <p style="margin:0 0 4px;font-size:11px;color:#9C958C;text-transform:uppercase;letter-spacing:0.1em;">Tracking Number</p>
        <p style="margin:0;font-size:15px;color:#2C2825;font-weight:600;font-family:monospace;">${trackingNumber}</p>
      </td></tr>
    </table>
    <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#9C958C;text-align:center;">
      Delivery typically takes 7–14 business days depending on your location.
    </p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#9C958C;text-align:center;">
      While you wait, explore this week's ritual prompt in your dashboard.
    </p>
  `);
}

function referralBonusHtml(name: string, friendEmail: string): string {
  const maskedEmail =
    friendEmail.charAt(0) +
    "***" +
    friendEmail.slice(friendEmail.indexOf("@"));
  return baseLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#2C2825;">Your referral bonus is here!</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#6B645B;">
      Hi ${name}, great news — your friend (${maskedEmail}) just subscribed and paid their first invoice.
      That means a bonus item will be included in your next box!
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#6B645B;">
      The more friends you invite, the more bonuses you earn. Thank you for spreading
      the love of Japanese stationery.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr><td style="background-color:#2C2825;border-radius:8px;padding:14px 32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://tokitomo.com'}/en/app/referrals" style="color:#FAF8F5;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.03em;">View Your Referrals</a>
      </td></tr>
    </table>
  `);
}

function paymentFailedHtml(name: string): string {
  return baseLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#2C2825;">We couldn't process your payment</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#6B645B;">
      Hi ${name}, we tried to charge your card for your TOKI &amp; TOMO subscription,
      but the payment didn't go through. Don't worry — your subscription is still active
      for now, but we'll need to resolve this soon.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#6B645B;">
      Please update your payment method to keep your boxes coming without interruption.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr><td style="background-color:#2C2825;border-radius:8px;padding:14px 32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://tokitomo.com'}/en/app/account" style="color:#FAF8F5;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.03em;">Update Payment Method</a>
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#9C958C;text-align:center;">
      Need help? Reply to this email and we'll assist you.
    </p>
  `);
}
