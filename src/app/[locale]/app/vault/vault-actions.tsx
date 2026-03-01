"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function VaultActions({
  vaultItemId,
  isWishlisted,
  addLabel,
  removeLabel,
}: {
  vaultItemId: string;
  isWishlisted: boolean;
  addLabel: string;
  removeLabel: string;
}) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    await fetch("/api/app/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vaultItemId,
        action: wishlisted ? "remove" : "add",
      }),
    });
    setWishlisted(!wishlisted);
    setLoading(false);
    router.refresh();
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      variant={wishlisted ? "secondary" : "outline"}
      size="sm"
      className={`mt-4 w-full transition-all ${
        wishlisted
          ? "bg-dustyrose/10 text-dustyrose hover:bg-dustyrose/20"
          : "border-charcoal/20 text-charcoal hover:bg-charcoal/5"
      }`}
    >
      <Heart
        className={`mr-1.5 h-3.5 w-3.5 transition-all ${wishlisted ? "fill-current text-dustyrose" : ""}`}
      />
      {wishlisted ? removeLabel : addLabel}
    </Button>
  );
}
