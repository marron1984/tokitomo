export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/subscription";
import { sendWelcomeEmail } from "@/lib/resend";

/**
 * POST /api/admin/test-email
 *
 * Admin-only endpoint to test email sending.
 * Sends a welcome email to the specified address (or to yourself).
 *
 * Body: { "to": "test@example.com" }  (optional — defaults to admin's email)
 *
 * Diagnostic response includes:
 * - Whether AUTH_RESEND_KEY is set
 * - What EMAIL_FROM is configured to
 * - Success or error details
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !(await isAdmin(session.user.email))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const targetEmail = body.to || session.user.email;

  const diagnostics = {
    AUTH_RESEND_KEY_set: !!process.env.AUTH_RESEND_KEY,
    AUTH_RESEND_KEY_prefix: process.env.AUTH_RESEND_KEY
      ? process.env.AUTH_RESEND_KEY.slice(0, 6) + "..."
      : null,
    EMAIL_FROM: process.env.EMAIL_FROM || "TOKI & TOMO <onboarding@resend.dev> (default)",
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO || "hello@tokitomo.com (default)",
    targetEmail,
  };

  if (!process.env.AUTH_RESEND_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "AUTH_RESEND_KEY is not set in environment variables",
        diagnostics,
        fix: "Add AUTH_RESEND_KEY=re_xxxxx to your .env file. Get key from https://resend.com/api-keys",
      },
      { status: 500 }
    );
  }

  try {
    await sendWelcomeEmail(targetEmail, "Test User");
    return NextResponse.json({
      success: true,
      message: `Test welcome email sent to ${targetEmail}`,
      diagnostics,
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        diagnostics,
        commonFixes: [
          "If 'validation_error': Your EMAIL_FROM domain is not verified in Resend. Use onboarding@resend.dev instead.",
          "If 'missing_api_key': AUTH_RESEND_KEY is invalid or expired.",
          "If 'rate_limit': Too many requests. Wait and try again.",
          "Resend sandbox (onboarding@resend.dev) can only send to the account owner's email address.",
        ],
      },
      { status: 500 }
    );
  }
}
