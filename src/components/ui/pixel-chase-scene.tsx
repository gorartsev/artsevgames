"use client";

import React from "react";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";
import { useScreenSize } from "@/hooks/use-screen-size";

type Palette = Record<string, string>;

function PixelSprite({
  rows,
  palette,
  flip = false,
}: {
  rows: string[];
  palette: Palette;
  flip?: boolean;
}) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      shapeRendering="crispEdges"
      style={{ display: "block", transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch !== "." && palette[ch] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />
          ) : null,
        ),
      )}
    </svg>
  );
}

/* ---- pixel Yegor ---- */
const YEGOR: Palette = { O: "#141414", H: "#3a2a1d", S: "#e7b78f", J: "#7d97b8", W: "#ffffff" };
const YEGOR_A = [
  "...HHHHH....",
  "..HHHHHHH...",
  "..HSSSSSH...",
  "..HSWSSSH...",
  "..HSSSSSH...",
  "...SSSSS....",
  "..OOOOOOO...",
  ".OOOOOOOOO..",
  ".OOOOOOOOO..",
  ".OOOOOOOOO..",
  "..JJ...JJ...",
  "..JJ...JJ...",
  "..O.....O...",
];
const YEGOR_B = [
  "...HHHHH....",
  "..HHHHHHH...",
  "..HSSSSSH...",
  "..HSWSSSH...",
  "..HSSSSSH...",
  "...SSSSS....",
  "..OOOOOOO...",
  ".OOOOOOOOO..",
  ".OOOOOOOOO..",
  ".OOOOOOOOO..",
  "...JJ.JJ....",
  "..JJ...JJ...",
  ".O.......O..",
];

const GHOST: Palette = { W: "#f4f4f2", O: "#16181c" };
const GHOST_S = [
  "...WWWW...",
  ".WWWWWWWW.",
  "WWWWWWWWWW",
  "WWOWWWWOWW",
  "WWOWWWWOWW",
  "WWWWWWWWWW",
  "WWWWWWWWWW",
  "WWWWWWWWWW",
  "WWWWWWWWWW",
  "W.WW.WW.WW",
];

const SKULL: Palette = { W: "#e9e9e4", O: "#16181c" };
const SKEL_A = [
  "..WWWW..",
  ".WWWWWW.",
  ".WOWWOW.",
  ".WWWWWW.",
  "..WOOW..",
  "...WW...",
  ".WWWWWW.",
  "W.WWWW.W",
  "W.WWWW.W",
  "..W..W..",
  ".W....W.",
];
const SKEL_B = [
  "..WWWW..",
  ".WWWWWW.",
  ".WOWWOW.",
  ".WWWWWW.",
  "..WOOW..",
  "...WW...",
  ".WWWWWW.",
  "W.WWWW.W",
  "W.WWWW.W",
  "...WW...",
  "..W..W..",
];

const VAMP: Palette = { K: "#15151d", S: "#dde6ea", R: "#b51616", W: "#ffffff" };
const VAMP_A = [
  ".K.KKKK.K.",
  ".KKKKKKKK.",
  ".KSSSSSSK.",
  ".KSRSSRSK.",
  ".KSSSSSSK.",
  ".KSWSSWSK.",
  ".KKKKKKKK.",
  "KKRRRRRRKK",
  "KKRRRRRRKK",
  "KK.RR.RRKK",
  ".K.K..K.K.",
];
const VAMP_B = [
  ".K.KKKK.K.",
  ".KKKKKKKK.",
  ".KSSSSSSK.",
  ".KSRSSRSK.",
  ".KSSSSSSK.",
  ".KSWSSWSK.",
  ".KKKKKKKK.",
  "KKRRRRRRKK",
  "KKRRRRRRKK",
  "KKRR.RRRKK",
  ".KK.K.KK..",
];

/* two-frame walker (legs swap) */
function Walker({
  a,
  b,
  palette,
  className,
}: {
  a: string[];
  b: string[];
  palette: Palette;
  className?: string;
}) {
  return (
    <div className={`walker relative ${className ?? ""}`}>
      <div className="absolute inset-0 f1">
        <PixelSprite rows={a} palette={palette} />
      </div>
      <div className="f2">
        <PixelSprite rows={b} palette={palette} />
      </div>
    </div>
  );
}

function Convoy() {
  return (
    <div className="flex items-end gap-8 md:gap-12 pr-24 md:pr-48">
      <Walker a={YEGOR_A} b={YEGOR_B} palette={YEGOR} className="w-[60px] md:w-[88px]" />
      <div className="w-12 md:w-28 shrink-0" />
      <Walker a={SKEL_A} b={SKEL_B} palette={SKULL} className="w-[46px] md:w-[64px] bobm" />
      <div className="m-float w-[52px] md:w-[74px]">
        <PixelSprite rows={GHOST_S} palette={GHOST} />
      </div>
      <Walker a={VAMP_A} b={VAMP_B} palette={VAMP} className="w-[56px] md:w-[80px] bobm" />
    </div>
  );
}

export function PixelChaseScene() {
  const screen = useScreenSize();
  const px = screen.lessThan("md") ? 56 : 72;

  return (
    <div className="pcs pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background">
      {/* CRT scanlines */}
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,#1B4332_0px,#1B4332_1px,transparent_1px,transparent_4px)]" />

      {/* interactive gooey pixel trail */}
      <GooeyFilter id="pcs-goo" strength={5} />
      <div
        className="pointer-events-auto absolute inset-0 z-0 hidden md:block"
        style={{ filter: "url(#pcs-goo)" }}
      >
        <PixelTrail pixelSize={px} fadeDuration={650} delay={0} pixelClassName="bg-primary/40" />
      </div>

      {/* pixel ground */}
      <div className="absolute left-0 right-0 bottom-[15%] z-[1] border-t-2 border-dashed border-primary/25" />

      {/* looping Scooby-Doo chase along the ground */}
      <div className="absolute left-0 right-0 bottom-[15%] z-[2] overflow-hidden">
        <div className="track flex w-max">
          <Convoy />
          <Convoy />
        </div>
      </div>

      <style jsx>{`
        .track {
          animation: runloop 13s linear infinite;
        }
        .walker .f1 {
          animation: swapA 0.32s steps(1, end) infinite;
        }
        .walker .f2 {
          animation: swapB 0.32s steps(1, end) infinite;
        }
        .bobm {
          animation: bob 0.5s steps(2, end) infinite;
        }
        .m-float {
          animation: bob 0.7s steps(2, end) infinite;
        }
        @keyframes runloop {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes swapA {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        @keyframes swapB {
          0%,
          49% {
            opacity: 0;
          }
          50%,
          100% {
            opacity: 1;
          }
        }
        @keyframes bob {
          0%,
          49% {
            transform: translateY(0);
          }
          50%,
          100% {
            transform: translateY(-3px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .track,
          .walker .f1,
          .walker .f2,
          .bobm,
          .m-float {
            animation: none;
          }
          .walker .f2 {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
