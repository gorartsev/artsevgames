"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export interface Project {
  name: string;
  role: string;
  line: string;
  img: string;
  href?: string;
}

export function LevelSelect({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(0);
  const [watching, setWatching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // --- arcade "level select" blips (synthesized, no white noise) ---
  const audioCtx = () => {
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  const tone = (
    freq: number,
    dur: number,
    when = 0,
    type: OscillatorType = "square",
    vol = 0.12,
  ) => {
    try {
      const ctx = audioCtx();
      const t0 = ctx.currentTime + when;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur);
    } catch {
      /* audio not available */
    }
  };

  const playMove = () => tone(720, 0.08, 0, "square", 0.11);
  const playEnter = () => {
    tone(620, 0.08, 0, "square", 0.12);
    tone(940, 0.13, 0.07, "square", 0.12);
  };

  const flip = (next: number, d: number) => {
    playMove();
    setDir(d);
    setI(((next % projects.length) + projects.length) % projects.length);
  };

  const go = (delta: number) => flip(i + delta, delta > 0 ? 1 : -1);
  const goTo = (idx: number) => {
    if (idx !== i) flip(idx, idx > i ? 1 : -1);
  };
  const enter = () => {
    playEnter();
    if (c.href) router.push(c.href);
    else setWatching(true);
  };

  const c = projects[i];
  const ch = String(i + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");

  const slide = {
    enter: (d: number) => ({ x: `${d * 100}%`, opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: `${-d * 100}%`, opacity: 0 }),
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* heading */}
      <div className="mb-9 text-center md:mb-12">
        <h2 className="retro text-lg text-foreground sm:text-2xl md:text-4xl">
          SELECT A PROJECT
        </h2>
        <p className="retro mt-3 text-[8px] tracking-[0.15em] text-primary md:text-[11px]">
          ◀ YEGOR ARTSEV · PORTFOLIO ▶
        </p>
      </div>

      {/* arrows + preview */}
      <div className="relative flex items-center gap-3 md:gap-6">
        {/* desktop arrows beside the card */}
        <div className="hidden md:block">
          <ArrowButton label="◀" ariaLabel="Previous project" onClick={() => go(-1)} />
        </div>

        {/* level preview card (clickable) — full width on mobile */}
        <button
          type="button"
          onClick={enter}
          aria-label={`Open ${c.name}`}
          className="group relative block aspect-video w-full cursor-pointer overflow-hidden border-4 border-[#0a0c08] bg-black text-left shadow-[0_0_0_3px_rgba(64,145,108,0.5),0_28px_55px_-15px_rgba(0,0,0,0.55)] md:w-auto md:flex-1"
        >
          {/* sliding level content */}
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={i}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#0b3a23]/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.2)_0px,rgba(0,0,0,0.2)_1px,transparent_1px,transparent_3px)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.7))]" />
              {/* info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 md:p-7">
                <p className="retro mb-2 text-[9px] text-[#9be37b] [text-shadow:0_1px_4px_#000]">
                  {c.role}
                </p>
                <h3 className="retro text-base text-white md:text-xl [text-shadow:0_2px_6px_#000]">
                  {c.name}
                </h3>
                <p className="mt-2 hidden max-w-md text-xs text-white/80 sm:block md:text-sm">
                  {c.line}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* static overlays (above the sliding content) */}
          <div className="retro pointer-events-none absolute left-3 top-3 z-20 text-[10px] text-[#9be37b] [text-shadow:0_1px_4px_#000] md:text-xs">
            LEVEL {ch} / {total}
          </div>
          <div className="retro pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-1 text-[9px] text-[#9be37b]/90 [text-shadow:0_1px_4px_#000]">
            <span className="h-2 w-2 animate-pulse bg-[#9be37b]" /> READY
          </div>
          <div className="retro pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 [text-shadow:0_2px_8px_#000]">
            ▶ ENTER
          </div>
        </button>

        {/* desktop arrows beside the card */}
        <div className="hidden md:block">
          <ArrowButton label="▶" ariaLabel="Next project" onClick={() => go(1)} />
        </div>

        {/* mobile arrows overlaid on the card edges */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="retro absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-[#9be37b]/80 bg-black/55 text-lg text-[#9be37b] backdrop-blur-sm transition active:scale-90 md:hidden"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="retro absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-[#9be37b]/80 bg-black/55 text-lg text-[#9be37b] backdrop-blur-sm transition active:scale-90 md:hidden"
        >
          ▶
        </button>
      </div>

      {/* explicit open-project CTA (always visible, key on mobile where hover ENTER is hidden) */}
      <div className="mt-6 flex justify-center px-4 md:mt-7">
        <button
          type="button"
          onClick={enter}
          aria-label={`Open ${c.name}`}
          className="retro inline-flex w-full max-w-[300px] items-center justify-center gap-3 border-4 border-[#0a0c08] bg-[linear-gradient(160deg,#52b788,#2d6a4f)] px-7 py-3.5 text-[11px] text-[#0a1f12] shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_5px_0_#0a0c08] transition hover:brightness-110 active:translate-y-[3px] active:shadow-[inset_0_2px_0_rgba(255,255,255,0.25)] sm:w-auto md:text-sm"
        >
          <span
            aria-hidden="true"
            className="inline-block h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-current"
          />
          OPEN PROJECT
        </button>
      </div>

      {/* level pips */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {projects.map((p, k) => (
          <button
            key={p.name}
            onClick={() => goTo(k)}
            aria-label={`Go to ${p.name}`}
            className={`h-3.5 w-3.5 border-2 border-[#0a0c08] transition ${
              k === i
                ? "scale-110 bg-[#9be37b] shadow-[0_0_8px_#9be37b]"
                : "bg-primary/40 hover:bg-primary/70"
            }`}
          />
        ))}
      </div>

      {/* ENTER overlay (portaled fullscreen) */}
      {watching &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setWatching(false)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden border-4 border-[#0a0c08] bg-black shadow-[0_0_0_3px_rgba(64,145,108,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[#0b3a23]/25 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.16)_0px,rgba(0,0,0,0.16)_1px,transparent_1px,transparent_3px)]" />
                <div className="retro absolute left-4 top-4 text-[10px] text-[#9be37b] [text-shadow:0_1px_4px_#000]">
                  NOW PLAYING · LEVEL {ch} / {total}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 md:p-8">
                  <p className="retro mb-2 text-[9px] text-[#9be37b]">{c.role}</p>
                  <h3 className="retro text-base text-white md:text-2xl">
                    {c.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm text-white/85">{c.line}</p>
                </div>
              </div>
              <button
                onClick={() => setWatching(false)}
                className="retro absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center border-2 border-[#0a0c08] bg-[#ff6a5a] text-sm text-[#2a0b07]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function ArrowButton({
  label,
  ariaLabel,
  onClick,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="retro flex h-20 w-12 shrink-0 items-center justify-center border-4 border-[#0a0c08] bg-[linear-gradient(160deg,#52b788,#2d6a4f)] text-xl text-[#0a1f12] shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_5px_0_#0a0c08] transition hover:brightness-110 active:translate-y-[3px] active:shadow-[inset_0_2px_0_rgba(255,255,255,0.25)] md:h-32 md:w-20 md:text-4xl"
    >
      {label}
    </button>
  );
}
