"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/ui/8bit-loading-screen";
import { cn } from "@/lib/utils";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  // safety: never let the loader stick, even under heavy first-paint load
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 3200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      className={cn(
        "retro fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700",
        done && "pointer-events-none opacity-0",
      )}
      onTransitionEnd={() => done && setGone(true)}
    >
      <LoadingScreen
        className="w-full max-w-md"
        title="LOADING"
        autoProgress
        autoProgressDuration={2600}
      />
    </div>
  );
}
