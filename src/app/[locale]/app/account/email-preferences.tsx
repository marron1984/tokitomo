"use client";

import { useEffect, useState } from "react";
import { Mail, Bell, Gift } from "lucide-react";

type Prefs = {
  emailShipping: boolean;
  emailMarketing: boolean;
  emailReferral: boolean;
};

export function EmailPreferences() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/app/email-preferences")
      .then((r) => r.json())
      .then(setPrefs)
      .catch(() => {});
  }, []);

  async function toggle(key: keyof Prefs) {
    if (!prefs) return;
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    setSaving(true);
    try {
      await fetch("/api/app/email-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch {
      // revert on error
      setPrefs(prefs);
    }
    setSaving(false);
  }

  if (!prefs) {
    return (
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 animate-pulse rounded-lg bg-cream" />
        ))}
      </div>
    );
  }

  const items: { key: keyof Prefs; icon: typeof Mail; label: string; desc: string }[] = [
    {
      key: "emailShipping",
      icon: Mail,
      label: "Shipping updates",
      desc: "Get notified when your box ships",
    },
    {
      key: "emailMarketing",
      icon: Bell,
      label: "News & themes",
      desc: "Monthly theme reveals, new items, and stories",
    },
    {
      key: "emailReferral",
      icon: Gift,
      label: "Referral bonuses",
      desc: "Know when your friends subscribe",
    },
  ];

  return (
    <div className="mt-4 space-y-3">
      {items.map(({ key, icon: Icon, label, desc }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          disabled={saving}
          className="flex w-full items-center gap-4 rounded-xl border border-border/60 p-4 text-left transition-colors duration-300 hover:bg-cream/50"
        >
          <Icon className="h-5 w-5 shrink-0 text-warmgray" />
          <div className="flex-1">
            <p className="text-sm font-medium text-charcoal">{label}</p>
            <p className="text-xs text-warmgray">{desc}</p>
          </div>
          <div
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
              prefs[key] ? "bg-sage" : "bg-warmgray/30"
            }`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                prefs[key] ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
