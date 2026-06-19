"use client";

import { useEffect, useState } from "react";

/**
 * Global click-to-zoom lightbox.
 * Makes every <img> inside an <article> zoomable (project case-study pages).
 * The home page has no <article>, so its cards/hero are untouched.
 */
export function Lightbox() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");

  // delegate clicks on content images
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || t.tagName !== "IMG") return;
      if (!t.closest("article") || t.closest("a")) return;
      if (t.closest("[data-lightbox]")) return;
      const im = t as HTMLImageElement;
      e.preventDefault();
      setSrc(im.currentSrc || im.src);
      setAlt(im.alt || "");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // esc to close + lock scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      data-lightbox
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-10 backdrop-blur-sm"
      style={{ cursor: "zoom-out" }}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* close */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
        aria-label="Close"
        className="retro absolute right-4 top-4 z-[101] flex h-11 w-11 items-center justify-center border-2 border-[#0a0c08] bg-primary text-[12px] text-primary-foreground transition hover:brightness-110"
      >
        ✕
      </button>

      <figure
        className="relative max-h-[88vh] max-w-[94vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden border-4 border-[#0a0c08] bg-black shadow-[0_0_0_3px_rgba(64,145,108,0.5),0_24px_60px_-20px_rgba(0,0,0,0.7)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block max-h-[80vh] max-w-[90vw] object-contain"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_3px)]" />
        </div>
        {alt ? (
          <figcaption className="retro mt-3 text-center text-[9px] leading-relaxed text-white/70">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
