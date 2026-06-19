"use client";

import { useEffect, useRef, useState } from "react";

const PAL: Record<string, string> = {
  O: "#0e0f12", // outline
  H: "#50555e", // body highlight
  D: "#3a3e45", // body mid
  d: "#2a2d33", // body shadow
  K: "#15171c", // d-pad
  S: "#5a606a", // stick
  s: "#3a3e45", // stick shadow
  L: "#ff5a5a", // led
  G: "#7fd06a", // green btn
  g: "#4f8f43",
  P: "#e58fc0", // pink btn
  p: "#b35e94",
  B: "#5aa9e6", // blue btn
  b: "#3a7bb5",
  R: "#e0556b", // red btn
  r: "#a83b4d",
};

const GAMEPAD = [
  "...OOOO........OOOO...",
  "..OHHHHO......OHHHHO..",
  ".OHDDDDOOLLLLOODDDDHO.",
  ".OHDDDDDDDDDDDDDDDDHO.",
  "OHDDKDDDDDDDDDDDGgDDHO",
  "OHDKKKDDDDDDDDPpDBbDHO",
  "OHDDKDDDDDDDDDDDRrDDHO",
  "OHDDDDSSDDDDSSDDDDDDHO",
  "OHDDDSssSDSssSDDDDDDHO",
  ".OHDDSSDDDDSSDDDDDdHO.",
  ".OHHddddddddddddddHHO.",
  "..OOHdddO....OdddHOO..",
  "OOddddOO......OOddddOO",
  "OddddO..........OddddO",
  ".OOOO............OOOO.",
];

const CPAL: Record<string, string> = {
  O: "#1c1e22",
  D: "#3a3e45",
  B: "#7b9bd6",
  b: "#a9c0ef",
};

const CROSS = [
  "....OOOOOOOO....",
  "..OODDDDDDDDOO..",
  ".ODDDDDDDDDDDDO.",
  "ODDbBDDDDDDbBDDO",
  "ODDBBDDDDDDBBDDO",
  "ODDDBBDDDDBBDDDO",
  "ODDDDBBDDBBDDDDO",
  "ODDDDDBBBBDDDDDO",
  "ODDDDDBBBBDDDDDO",
  "ODDDDBBDDBBDDDDO",
  "ODDDBBDDDDBBDDDO",
  "ODDBBDDDDDDBBDDO",
  "ODDbDDDDDDDDbDDO",
  ".ODDDDDDDDDDDDO.",
  "..OODDDDDDDDOO..",
  "....OOOOOOOO....",
];

function Sprite({
  rows,
  palette,
  scale,
}: {
  rows: string[];
  palette: Record<string, string>;
  scale: number;
}) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: "block", filter: "drop-shadow(1px 2px 0 rgba(0,0,0,0.4))" }}
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

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const hotRef = useRef(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-hidden");

    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const clickable = !!target?.closest('a, button, [role="button"], input, select, textarea');
      if (clickable !== hotRef.current) {
        hotRef.current = clickable;
        setHot(clickable);
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {hot ? (
        <div style={{ transform: "translate(-50%, -50%)" }}>
          <Sprite rows={CROSS} palette={CPAL} scale={2.4} />
        </div>
      ) : (
        <div className="cm-bob" style={{ transform: "translate(-3px, -3px)" }}>
          <Sprite rows={GAMEPAD} palette={PAL} scale={2} />
        </div>
      )}
    </div>
  );
}
