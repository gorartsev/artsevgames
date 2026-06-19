"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/ui/8bit-loading-screen";
import { useAudio } from "@/components/providers/audio-provider";
import { setScrollLocked } from "@/components/providers/boot-lock";
import { cn } from "@/lib/utils";

export function BootScreen() {
  const { play } = useAudio();
  const [phase, setPhase] = useState<"menu" | "loading">("menu");
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  // lock scroll while the menu / loading is up, release once we enter the site
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("boot-lock", !done);
    setScrollLocked(!done);
    return () => {
      html.classList.remove("boot-lock");
      setScrollLocked(false);
    };
  }, [done]);

  const handlePlay = () => {
    play(); // the click is the user gesture → music starts legally, right now
    setPhase("loading");
    window.setTimeout(() => setDone(true), 2800);
  };

  if (gone) return null;

  return (
    <div
      className={cn(
        "retro fixed inset-0 z-[100] overflow-hidden bg-background transition-opacity duration-700",
        done && "pointer-events-none opacity-0",
      )}
      onTransitionEnd={() => done && setGone(true)}
    >
      {/* faded CRT scene behind the menu */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-crt.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        draggable={false}
      />
      <div className="absolute inset-0 -z-10 bg-black/70" />
      {/* scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.5) 3px)",
        }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-white">
        {phase === "menu" ? (
          <div className="flex flex-col items-center gap-8 text-center md:gap-10">
            <p className="retro text-[10px] tracking-[0.2em] text-[#9be37b]">
              [ Portfolio · 2026 ]
            </p>
            <h1 className="retro text-2xl md:text-5xl [text-shadow:0_3px_14px_rgba(0,0,0,0.6)]">
              YEGOR ARTSEV
            </h1>
            <p className="retro text-[10px] tracking-[0.1em] text-white/70 md:text-xs">
              SCARY GOOD GAME DESIGNER
            </p>

            <button
              type="button"
              onClick={handlePlay}
              className="group mt-2 flex items-center gap-4 border-4 border-[#9be37b] px-10 py-5 retro text-lg text-[#9be37b] transition-colors hover:bg-[#9be37b] hover:text-black md:text-2xl"
              style={{ boxShadow: "0 6px 0 0 rgba(0,0,0,0.5)" }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-current"
              />
              <span>PLAY</span>
            </button>

            <p className="hud-blink retro text-[9px] tracking-[0.2em] text-white/60">
              PRESS PLAY TO START
            </p>
          </div>
        ) : (
          <LoadingScreen
            className="w-full max-w-md"
            title="LOADING"
            autoProgress
            autoProgressDuration={2600}
          />
        )}
      </div>
    </div>
  );
}
