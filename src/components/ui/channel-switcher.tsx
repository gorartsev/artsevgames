"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface Channel {
  name: string;
  role: string;
  line: string;
  img: string;
}

export function ChannelSwitcher({ channels }: { channels: Channel[] }) {
  const [i, setI] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [watching, setWatching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => setMounted(true), []);

  const playStatic = () => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioRef.current) audioRef.current = new Ctx();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const dur = 0.2;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let s = 0; s < data.length; s++) data[s] = (Math.random() * 2 - 1) * 0.5;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2400;
      bp.Q.value = 0.8;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      src.connect(bp);
      bp.connect(gain);
      gain.connect(ctx.destination);
      src.start();
      src.stop(ctx.currentTime + dur);
    } catch {
      /* audio not available */
    }
  };

  const go = (dir: number) => {
    playStatic();
    setGlitch(true);
    window.setTimeout(() => {
      setI((p) => (p + dir + channels.length) % channels.length);
    }, 130);
    window.setTimeout(() => setGlitch(false), 320);
  };

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= channels.length) return;
    playStatic();
    setGlitch(true);
    window.setTimeout(() => setI(idx), 130);
    window.setTimeout(() => setGlitch(false), 320);
  };

  const watch = () => {
    playStatic();
    setWatching(true);
  };

  const c = channels[i];
  const ch = String(i + 1).padStart(2, "0");

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="relative mx-auto w-full max-w-6xl">
        {/* antenna — telescoping rods with ball tips + base coil */}
        <div className="absolute -top-20 left-1/2 z-0 hidden h-24 w-56 -translate-x-1/2 md:block">
          {/* left rod */}
          <div className="absolute bottom-2 left-1/2 h-20 w-[4px] origin-bottom -translate-x-1/2 -rotate-[32deg] rounded-full bg-[linear-gradient(to_top,#1a1c14,#5a5e51)]">
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#6a6e60,#101208)]" />
            <span className="absolute top-7 left-1/2 h-[2px] w-[6px] -translate-x-1/2 rounded bg-[#0c0e08]" />
          </div>
          {/* right rod */}
          <div className="absolute bottom-2 left-1/2 h-20 w-[4px] origin-bottom -translate-x-1/2 rotate-[32deg] rounded-full bg-[linear-gradient(to_top,#1a1c14,#5a5e51)]">
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#6a6e60,#101208)]" />
            <span className="absolute top-7 left-1/2 h-[2px] w-[6px] -translate-x-1/2 rounded bg-[#0c0e08]" />
          </div>
          {/* base hub */}
          <div className="absolute bottom-0 left-1/2 h-4 w-10 -translate-x-1/2 rounded-t-md bg-[linear-gradient(150deg,#3a3e33,#101208)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        </div>

        {/* TV body */}
        <div className="relative z-10 flex gap-3 overflow-hidden rounded-[26px] border-4 border-[#0a0c08] bg-[linear-gradient(150deg,#42473a_0%,#2a2d22_45%,#15170f_100%)] p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65),inset_0_2px_0_rgba(255,255,255,0.06)] md:gap-4 md:p-5">
          {/* top vent slits */}
          <div className="pointer-events-none absolute right-6 top-[6px] hidden gap-[3px] md:flex">
            {Array.from({ length: 7 }).map((_, k) => (
              <span key={k} className="h-[3px] w-[2px] rounded-full bg-black/40" />
            ))}
          </div>
          {/* corner screws */}
          <span className="absolute left-2 top-2 z-20 hidden md:block"><Screw /></span>
          <span className="absolute right-2 top-2 z-20 hidden md:block"><Screw /></span>
          <span className="absolute bottom-2 left-2 z-20 hidden md:block"><Screw /></span>
          <span className="absolute bottom-2 right-2 z-20 hidden md:block"><Screw /></span>

          {/* screen bezel */}
          <div className="relative flex-1 rounded-[18px] bg-[#070806] p-[6px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.04)]">
            {/* screen (clickable) */}
            <button
              type="button"
              onClick={watch}
              aria-label={`Watch ${c.name}`}
              className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-[14px] border-[3px] border-[#050604] bg-black text-left shadow-[inset_0_0_60px_rgba(0,0,0,0.95)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#0b3a23]/35 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.22)_0px,rgba(0,0,0,0.22)_1px,transparent_1px,transparent_3px)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(0,0,0,0.75))]" />
              {/* CRT glass sheen */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_38%)]" />

              <div className="retro absolute left-3 top-3 text-[10px] text-[#9be37b] [text-shadow:0_1px_4px_#000]">
                CH {ch}
              </div>
              <div className="retro absolute right-3 top-3 flex items-center gap-1 text-[10px] text-[#ff6a5a] [text-shadow:0_1px_4px_#000]">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ff6a5a]" /> REC
              </div>

              {/* hover hint */}
              <div className="retro absolute inset-0 z-20 flex items-center justify-center text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 [text-shadow:0_2px_8px_#000]">
                ▶ Click to watch
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-4 md:p-6">
                <p className="retro mb-2 text-[9px] text-[#9be37b] [text-shadow:0_1px_4px_#000]">
                  {c.role}
                </p>
                <h3 className="retro text-xs text-white md:text-base [text-shadow:0_2px_6px_#000]">
                  {c.name}
                </h3>
                <p className="mt-2 max-w-md text-xs text-white/80 md:text-sm">{c.line}</p>
              </div>

              {glitch && (
                <div className="channel-static pointer-events-none absolute inset-0 z-10" aria-hidden="true">
                  <svg className="h-full w-full" preserveAspectRatio="none">
                    <filter id="tvnoise">
                      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#tvnoise)" opacity="0.85" />
                  </svg>
                </div>
              )}
            </button>
            {/* model plate under screen */}
            <div className="retro mt-2 flex items-center justify-between px-1 text-[6px] tracking-tighter text-[#9be37b]/55">
              <span>RT-6000 · TRINITRON COLOR</span>
              <span>◉ DYNAMIC</span>
            </div>
          </div>

          {/* control panel */}
          <div className="relative hidden w-28 flex-col items-center justify-between py-1 md:flex">
            {/* tuner knobs */}
            <div className="flex flex-col items-center gap-3">
              <Knob label="CHANNEL" big />
              <Knob label="VOL" />
            </div>
            {/* band toggle */}
            <div className="retro flex w-full items-center justify-center gap-2 text-[6px] tracking-tighter text-[#9be37b]/70">
              <span className="rounded-sm bg-[#0c0e08] px-1 py-[1px] text-[#9be37b]">VHF</span>
              <span className="px-1 py-[1px] text-[#9be37b]/40">UHF</span>
            </div>
            {/* brand plate */}
            <div className="retro rounded-sm border border-[#0c0e08] px-2 py-[2px] text-[7px] tracking-tighter text-[#9be37b] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              RETROTECH
            </div>
            {/* speaker grille */}
            <div className="flex w-full flex-col gap-[3px] rounded bg-black/25 p-[5px]">
              {Array.from({ length: 9 }).map((_, k) => (
                <span key={k} className="h-[2px] w-full rounded bg-[#0c0e0a]" />
              ))}
            </div>
            {/* power row */}
            <div className="flex w-full items-center justify-center gap-2">
              <button
                aria-label="Power"
                className="relative h-6 w-6 rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a2e2a,#1a0805)] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.5)] active:translate-y-[1px]"
              >
                <span className="absolute left-1/2 top-1/2 h-2.5 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-[#ff6a5a]/80" />
              </button>
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#9be37b] shadow-[0_0_6px_#9be37b]" />
            </div>
          </div>
        </div>

        {/* feet */}
        <div className="relative z-0 mx-auto flex w-[82%] justify-between">
          <div className="h-4 w-12 rounded-b-xl bg-[linear-gradient(to_bottom,#1a1c14,#0a0c08)] shadow-[0_4px_6px_-2px_rgba(0,0,0,0.5)]" />
          <div className="h-4 w-12 rounded-b-xl bg-[linear-gradient(to_bottom,#1a1c14,#0a0c08)] shadow-[0_4px_6px_-2px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* REMOTE */}
      <div className="mt-10 flex justify-center">
        <div className="relative flex w-[300px] flex-col items-center gap-5 rounded-[28px] border-2 border-[#0a0c08] bg-[linear-gradient(165deg,#34382e_0%,#22251c_50%,#101208_100%)] px-7 py-7 shadow-[0_24px_40px_-12px_rgba(0,0,0,0.6),inset_0_2px_0_rgba(255,255,255,0.06)]">
          {/* body screws */}
          <span className="absolute left-3 top-3"><Screw /></span>
          <span className="absolute right-3 top-3"><Screw /></span>
          <span className="absolute bottom-3 left-3"><Screw /></span>
          <span className="absolute bottom-3 right-3"><Screw /></span>

          {/* top: IR window + brand + power */}
          <div className="flex w-full items-center justify-between">
            <span className="relative flex h-3.5 w-7 items-center justify-center rounded-sm bg-[#1a0805]" title="IR emitter">
              <span className="h-2 w-2 rounded-full bg-[#ff6a5a] shadow-[0_0_8px_#ff6a5a]" />
            </span>
            <span className="retro text-[8px] tracking-tighter text-[#9be37b]">RETROTECH</span>
            <button
              aria-label="Power"
              className="relative h-7 w-7 rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a2e2a,#1a0805)] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.6)] active:translate-y-[1px]"
            >
              <span className="absolute left-1/2 top-1/2 h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-[#ff6a5a]/80" />
            </button>
          </div>

          {/* channel LCD strip */}
          <div className="flex w-full items-center justify-between rounded-md border border-[#0a0c08] bg-[#0b1409] px-3 py-1.5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.7)]">
            <span className="retro text-[7px] tracking-tighter text-[#9be37b]/60">CH</span>
            <span className="retro text-sm text-[#9be37b] [text-shadow:0_0_6px_rgba(155,227,123,0.6)]">{ch}</span>
            <span className="retro text-[7px] tracking-tighter text-[#9be37b]/60">{c.name.slice(0, 8).toUpperCase()}</span>
          </div>

          {/* primary controls */}
          <div className="flex w-full items-center justify-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous channel"
              className="retro flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#0a0c08] bg-[linear-gradient(160deg,#52b788,#2d6a4f)] text-xl text-[#0a1f12] shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_3px_0_#0a0c08] transition active:translate-y-[2px] active:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]"
            >
              ▲
            </button>
            <button
              onClick={watch}
              aria-label="Start watch"
              className="retro flex h-14 flex-1 items-center justify-center rounded-xl border-2 border-[#0a0c08] bg-[linear-gradient(160deg,#ff8475,#e0463a)] px-2 text-[10px] text-[#2a0b07] shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_3px_0_#0a0c08] transition active:translate-y-[2px] active:shadow-[inset_0_2px_0_rgba(255,255,255,0.25)]"
            >
              ▶ START
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next channel"
              className="retro flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#0a0c08] bg-[linear-gradient(160deg,#52b788,#2d6a4f)] text-xl text-[#0a1f12] shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_3px_0_#0a0c08] transition active:translate-y-[2px] active:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]"
            >
              ▼
            </button>
          </div>

          {/* number pad — digits jump straight to that channel */}
          <div className="grid w-full grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <RemoteKey
                key={n}
                label={String(n)}
                disabled={n > channels.length}
                onClick={() => goTo(n - 1)}
              />
            ))}
            <RemoteKey label="MENU" small />
            <RemoteKey label="0" disabled />
            <RemoteKey label="MUTE" small />
          </div>

          {/* bottom: VOL rocker + model + battery */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center overflow-hidden rounded-md border border-[#0a0c08]">
              <span className="retro bg-[#1a1c14] px-2 py-1 text-[9px] text-[#9be37b]/70">VOL</span>
              <span className="retro bg-[#22251c] px-2 py-1 text-[10px] text-[#9be37b]">−</span>
              <span className="retro bg-[#1a1c14] px-2 py-1 text-[10px] text-[#9be37b]">+</span>
            </div>
            <span className="retro text-[6px] tracking-tighter text-[#9be37b]/45">RT-9000</span>
            <div className="flex items-center gap-[3px]" title="battery">
              <span className="h-2 w-1 rounded-sm bg-[#9be37b]" />
              <span className="h-2 w-1 rounded-sm bg-[#9be37b]" />
              <span className="h-2 w-1 rounded-sm bg-[#9be37b]/30" />
            </div>
          </div>
        </div>
      </div>

      {/* WATCH overlay (portaled to body so it's a true fullscreen modal) */}
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
            <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-[#0a0c08] bg-black">
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
                NOW WATCHING — CH {ch}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 md:p-8">
                <p className="retro mb-2 text-[9px] text-[#9be37b]">{c.role}</p>
                <h3 className="retro text-base text-white md:text-2xl">{c.name}</h3>
                <p className="mt-3 max-w-xl text-sm text-white/85">{c.line}</p>
              </div>
            </div>
            <button
              onClick={() => setWatching(false)}
              className="retro absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-md border-2 border-[#0a0c08] bg-[#ff6a5a] text-sm text-[#2a0b07]"
              aria-label="Close"
            >
              ✕
            </button>
            </div>
          </div>,
          document.body,
        )}

      <style jsx>{`
        .channel-static {
          animation: tvflicker 0.32s steps(2, end);
        }
        @keyframes tvflicker {
          0% { opacity: 0.95; }
          50% { opacity: 0.55; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Screw() {
  return (
    <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a5e51,#0a0c07)] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)]">
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/70" />
    </span>
  );
}

function Knob({ label, big }: { label?: string; big?: boolean }) {
  const size = big ? 44 : 34;
  const reach = big ? 17 : 13;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative rounded-full bg-[radial-gradient(circle_at_35%_30%,#52564a,#0a0c07)] shadow-[inset_0_-3px_5px_rgba(0,0,0,0.6),0_2px_3px_rgba(0,0,0,0.5)]"
        style={{ height: size, width: size }}
      >
        {/* ticks */}
        {Array.from({ length: 8 }).map((_, k) => (
          <span
            key={k}
            className="absolute left-1/2 top-1/2 h-[5px] w-[1px] bg-[#9be37b]/30"
            style={{ transform: `rotate(${k * 45}deg) translateY(-${reach}px)` }}
          />
        ))}
        {/* pointer */}
        <span className="absolute left-1/2 top-[3px] h-3 w-[2px] -translate-x-1/2 rounded bg-[#9be37b] shadow-[0_0_4px_rgba(155,227,123,0.6)]" />
        {/* center cap */}
        <span className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#3a3e33,#080a05)]" />
      </div>
      {label && (
        <span className="retro text-[6px] tracking-tighter text-[#9be37b]/70">{label}</span>
      )}
    </div>
  );
}

function RemoteKey({
  label,
  onClick,
  disabled,
  small,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`retro flex h-9 items-center justify-center rounded-md border border-[#0a0c08] bg-[linear-gradient(160deg,#3a3e33,#1a1c14)] text-[#cfe8c0] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_2px_2px_rgba(0,0,0,0.4)] transition active:translate-y-[1px] disabled:opacity-35 ${
        small ? "text-[6px] tracking-tighter" : "text-[11px]"
      } ${!disabled && onClick ? "hover:text-white" : ""}`}
    >
      {label}
    </button>
  );
}
