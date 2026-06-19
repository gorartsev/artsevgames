"use client";

import { useEffect, useState } from "react";
import { SoundToggle } from "@/components/ui/sound-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-300 md:px-10 ${
        scrolled
          ? "border-b border-[#9be37b]/20 bg-black/55 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* left: sound toggle + name */}
      <div className="flex items-center gap-4 text-white md:gap-6">
        <SoundToggle />
        <span className="hidden retro text-[9px] tracking-[0.05em] sm:inline">
          Yegor Artsev
        </span>
      </div>

      {/* center: nav */}
      <nav className="hidden gap-8 retro text-[9px] text-white/75 md:flex">
        <a href="#work" className="transition-colors hover:text-white">
          Work
        </a>
        <a href="#about" className="transition-colors hover:text-white">
          About
        </a>
        <a href="#contact" className="transition-colors hover:text-white">
          Contact
        </a>
      </nav>

      {/* right: animated open-to-work */}
      <span className="flex items-center gap-2 retro text-[9px] text-[#9be37b]">
        <span
          className="hud-blink inline-block h-2 w-2 bg-[#9be37b]"
          style={{ boxShadow: "0 0 0 1px #0e120f" }}
        />
        <span className="hidden sm:inline">Open to work</span>
      </span>
    </header>
  );
}
