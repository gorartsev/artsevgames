"use client";

import { useAudio } from "@/components/providers/audio-provider";

/* detailed beamed eighth-note (♫) pixel sprite */
const NOTE_PAL: Record<string, string> = {
  O: "#0e120f", // outline
  G: "#40916C", // beam + stems (primary)
  H: "#95e6bd", // top highlight
  N: "#2d6a4f", // note heads
  h: "#52b083", // head highlight
};

const NOTE = [
  "......OOOOOOOOO..",
  ".....OHHHHHHHHGO.",
  "....OGHGGGGGGGGO.",
  "....OGGOOOOOOGGO.",
  "....OGGO....OGGO.",
  "....OGGO....OGGO.",
  "....OGGO....OGGO.",
  "....OGGO....OGGO.",
  "...OOGGO....OGGO.",
  "..ONhGGO...OOGGO.",
  ".ONNhNGO..ONhGGO.",
  ".ONNNNOO..ONNhNO.",
  ".ONNNNO...ONNNNO.",
  "..ONNO.....ONNO..",
  "...OO.......OO...",
];

function NoteSprite({ scale }: { scale: number }) {
  const w = Math.max(...NOTE.map((r) => r.length));
  const h = NOTE.length;
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: "block", filter: "drop-shadow(1px 2px 0 rgba(0,0,0,0.45))" }}
    >
      {NOTE.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch !== "." && NOTE_PAL[ch] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={NOTE_PAL[ch]} />
          ) : null,
        ),
      )}
    </svg>
  );
}

export function SoundToggle() {
  const { isPlaying: playing, toggle } = useAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute background music" : "Play background music"}
      aria-pressed={playing}
      className="group flex items-center gap-2 select-none"
    >
      {/* the pixel note */}
      <span className="relative inline-block" style={{ opacity: playing ? 1 : 0.55 }}>
        <span className={playing ? "inline-block note-playing" : "inline-block"}>
          <NoteSprite scale={1.7} />
        </span>
        {/* red mute slash when off */}
        {!playing && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[34px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#e0556b]"
            style={{ boxShadow: "0 0 0 1px #0e120f" }}
          />
        )}
      </span>

      {/* equalizer bars (only while playing) */}
      <span className="flex h-5 w-4 items-end gap-[2px]" aria-hidden="true">
        {playing ? (
          <>
            <span className="eq-bar h-full w-[3px] bg-[#95e6bd]" />
            <span className="eq-bar h-full w-[3px] bg-[#40916C]" />
            <span className="eq-bar h-full w-[3px] bg-[#95e6bd]" />
          </>
        ) : (
          <>
            <span className="h-[3px] w-[3px] self-end bg-white/40" />
            <span className="h-[3px] w-[3px] self-end bg-white/40" />
            <span className="h-[3px] w-[3px] self-end bg-white/40" />
          </>
        )}
      </span>

      <span className="retro text-[8px] tracking-[0.05em] text-white/70 group-hover:text-white transition-colors">
        {playing ? "SOUND ON" : "SOUND OFF"}
      </span>
    </button>
  );
}
