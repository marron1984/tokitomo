"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RitualAction({
  weekNumber,
  label,
}: {
  weekNumber: number;
  label: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    setLoading(true);
    await fetch("/api/app/ritual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekNumber }),
    });
    router.refresh();
  };

  return (
    <Button
      onClick={handleComplete}
      disabled={loading}
      size="sm"
      className="mt-4 bg-charcoal text-cream hover:bg-charcoal/90"
    >
      {loading ? "..." : label}
    </Button>
  );
}
