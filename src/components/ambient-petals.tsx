"use client";

export function AmbientPetals() {
  const petals = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {petals.map((i) => (
        <div
          key={i}
          className="animate-petal-fall absolute text-dustyrose/20"
          style={{
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${12 + i * 2}s`,
            fontSize: `${10 + i * 3}px`,
          }}
        >
          &#x2740;
        </div>
      ))}
    </div>
  );
}
