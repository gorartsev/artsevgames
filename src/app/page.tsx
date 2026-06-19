"use client"

import { BootScreen } from "@/components/ui/boot-screen"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { GooeyText } from "@/components/ui/gooey-text-morphing"
import { LevelSelect } from "@/components/ui/level-select"
import { SiteHeader } from "@/components/ui/site-header"
import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
import Timeline2 from "@/components/ui/8bit-timeline2"
import FAQ1 from "@/components/ui/8bit-faq1"

const PROJECTS = [
  {
    name: "Khalifa University",
    role: "Game Designer · VR",
    line: "Gamified clinical training in VR. Won the contract, designed the product, led a small team. Unreal 5 · Meta Quest",
    img: "/khalifa-logo.jpg",
    href: "/work/khalifa-vr",
  },
  {
    name: "Real Estate VR / PC",
    role: "Game Designer · VR & Interactive · Contract (NDA)",
    line: "Walk through an apartment that won't exist for two years, in VR and on PC.",
    img: "/real-estate-contract.jpg",
    href: "/work/real-estate-vr",
  },
]
import {
  CenterUnderline,
  ComesInGoesOutUnderline,
  GoesOutComesInUnderline,
} from "@/components/ui/underline-animation"

export default function Home() {
  return (
    <main className="flex-1">
      <SiteHeader />
      <BootScreen />
      {/* ---------------- HERO ---------------- */}
      <section className="relative min-h-svh flex flex-col overflow-hidden text-white">
        {/* full-bleed CRT background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-crt.png"
          alt="Pixel-art horror chase on a retro CRT TV, Yegor Artsev portfolio hero"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          draggable={false}
        />
        {/* scrim for legibility */}
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),transparent_28%,transparent_68%,rgba(0,0,0,0.65))]" />

        {/* interactive gooey pixel trail (desktop) */}
        <GooeyFilter id="hero-goo" strength={6} />
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden md:block"
          style={{ filter: "url(#hero-goo)" }}
          aria-hidden="true"
        >
          <PixelTrail pixelSize={32} fadeDuration={2000} delay={0} pixelClassName="bg-[#52b788]" />
        </div>

        {/* center identity */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 gap-8">
          <p className="retro text-[10px] md:text-xs tracking-[0.08em] text-[#9be37b]">
            [ Portfolio · 2026 ]
          </p>

          <GooeyText
            texts={[
              "Yegor Artsev",
              "Game Designer",
              "Level Designer",
              "Systems Designer",
            ]}
            morphTime={1.2}
            cooldownTime={2.2}
            className="h-[58px] md:h-[92px] w-full max-w-5xl"
            textClassName="retro text-white whitespace-nowrap text-lg sm:text-3xl md:text-5xl [text-shadow:0_3px_14px_rgba(0,0,0,0.6)]"
          />

          <p className="retro text-[10px] md:text-xs tracking-[0.08em] text-[#9be37b]">
            Game / Level Designer · Builds &amp; Ships · Unity / UE
          </p>

          <p className="max-w-xl text-sm md:text-base text-white/85 leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
            I design games and immersive experiences and take them to playable,
            across mobile, PC and VR. Best work happens on a team, but I can
            carry a project on my own when it needs it.
          </p>

          <a
            href="#contact"
            className="group mt-2 flex items-center gap-3 retro text-sm tracking-[0.05em] text-[#9be37b] md:text-base"
          >
            <span
              className="hud-blink inline-block h-3 w-3 bg-[#9be37b]"
              style={{ boxShadow: "0 0 0 1px #0e120f" }}
            />
            <span className="group-hover:text-white transition-colors [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
              [ Let&apos;s talk ]
            </span>
          </a>
        </div>

        <div className="relative z-10 px-5 md:px-10 py-5 retro text-[9px] text-white/70 flex justify-between">
          <span>Remote · open to relocation</span>
          <span>[ Scroll ↓ ]</span>
        </div>
      </section>

      {/* ---------------- WORK (CRT channel switcher) ---------------- */}
      <section id="work" className="relative z-10 bg-background py-20 md:py-28">
        <div className="mb-10 px-5 text-center md:mb-14 md:px-10">
          <p className="retro text-[10px] tracking-[0.14em] text-primary">
            [ Selected work ]
          </p>
          <p className="mt-4 text-xs text-muted-foreground md:text-sm">
            Pick a level. Arrows flip through the work.
          </p>
        </div>
        <LevelSelect projects={PROJECTS} />
      </section>

      {/* ---------------- ABOUT (8-bit quest line) ---------------- */}
      <section id="about" className="relative z-10 bg-background">
        <Timeline2 />
      </section>

      {/* ---------------- FAQ (8-bit) ---------------- */}
      <section id="faq" className="relative z-10 bg-background">
        <FAQ1 />
      </section>

      {/* ---------------- CONTACT / FOOTER ---------------- */}
      <section id="contact" className="relative z-10 bg-background px-5 md:px-10 pt-16 pb-16 border-t border-border">
        <HandWrittenTitle title="Let's talk" subtitle="Available for game & level design roles" />

        <div className="flex flex-col items-center gap-5 retro text-sm md:text-xl pb-16">
          <a href="https://www.linkedin.com/in/yegor-artsev/" target="_blank" rel="noreferrer">
            <CenterUnderline label="LinkedIn" />
          </a>
          <a href="https://t.me/grarchimp" target="_blank" rel="noreferrer">
            <ComesInGoesOutUnderline label="Telegram" direction="right" />
          </a>
          <a href="/Yegor-Artsev-CV.pdf" download="Yegor-Artsev-CV.pdf">
            <ComesInGoesOutUnderline label="CV (PDF)" direction="left" />
          </a>
          <a href="mailto:artsevgames@gmail.com" className="pt-8">
            <GoesOutComesInUnderline label="artsevgames@gmail.com" direction="left" />
          </a>
        </div>

        <p className="retro text-[9px] text-muted-foreground text-center pb-8">
          © 2026 Yegor Artsev · Game &amp; Level Designer
        </p>
      </section>
    </main>
  )
}
