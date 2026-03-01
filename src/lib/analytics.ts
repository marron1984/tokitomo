"use client";

import { useCallback } from "react";

let sessionId: string | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  if (sessionId) return sessionId;

  const stored = document.cookie
    .split("; ")
    .find((c) => c.startsWith("tt_sid="))
    ?.split("=")[1];

  if (stored) {
    sessionId = stored;
    return stored;
  }

  const newId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  document.cookie = `tt_sid=${newId};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
  sessionId = newId;
  return newId;
}

export function getVariant(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_HERO_VARIANT ?? "A";
  }

  const params = new URLSearchParams(window.location.search);
  const queryVariant = params.get("v");
  if (queryVariant === "A" || queryVariant === "B") {
    document.cookie = `tt_variant=${queryVariant};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
    return queryVariant;
  }

  const stored = document.cookie
    .split("; ")
    .find((c) => c.startsWith("tt_variant="))
    ?.split("=")[1];

  if (stored === "A" || stored === "B") return stored;

  const envVariant = process.env.NEXT_PUBLIC_HERO_VARIANT ?? "A";
  document.cookie = `tt_variant=${envVariant};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
  return envVariant;
}

export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "start_checkout"
  | "checkout_success"
  | "checkout_cancel"
  | "login_start"
  | "signup_complete"
  | "address_completed"
  | "referral_share"
  | "referral_redeemed";

export async function trackEvent(
  eventName: AnalyticsEventName,
  props?: Record<string, string>
) {
  try {
    const sid = getSessionId();
    const variant = getVariant();
    const locale =
      window.location.pathname.match(/^\/(en|fr|ja)/)?.[1] ?? "en";

    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sid,
        locale,
        variant,
        eventName,
        props,
      }),
    });
  } catch {
    // Analytics should never break the app
  }
}

export function useTrack() {
  return useCallback(
    (eventName: AnalyticsEventName, props?: Record<string, string>) => {
      trackEvent(eventName, props);
    },
    []
  );
}
