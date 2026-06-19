"use client";

import { useEffect, useState } from "react";
import { SoundToggle } from "@/components/ui/sound-toggle";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBackdrop = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        showBackdrop
          ? "border-b border-[#9be37b]/20 bg-black/55 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        {/* left: sound toggle + name */}
        <div className="flex items-center gap-4 text-white md:gap-6">
          <SoundToggle />
          <span className="hidden retro text-[9px] tracking-[0.05em] sm:inline">
            Yegor Artsev
          </span>
        </div>

        {/* center: nav (desktop), absolutely centered regardless of side widths */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-8 retro text-[9px] text-white/75 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* right: status + mobile menu button */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 retro text-[9px] text-[#9be37b]">
            <span
              className="hud-blink inline-block h-2 w-2 bg-[#9be37b]"
              style={{ boxShadow: "0 0 0 1px #0e120f" }}
            />
            <span className="hidden sm:inline">Open to work</span>
          </span>

          {/* mobile hamburger (44px touch target) */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[4px] md:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-white transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-white transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      {open && (
        <nav className="border-t border-[#9be37b]/15 bg-black/85 backdrop-blur-md md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 retro text-xs text-white/85 transition-colors hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
