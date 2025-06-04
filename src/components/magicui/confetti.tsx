"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiFireworksProps {
  trigger: boolean;         // apakah animasi dimulai?
  durationMs?: number;      // durasi animasi dalam ms
}

export function ConfettiFireworks({ trigger, durationMs = 5000 }: ConfettiFireworksProps) {
  useEffect(() => {
    if (!trigger) return;

    const animationEnd = Date.now() + durationMs;
    const defaults = { startVelocity: 50, spread: 360, ticks: 80, zIndex: 9999};

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 500 * (timeLeft / durationMs);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [trigger, durationMs]);

  return null; // tidak render apapun, hanya efek
}
