import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "24 Play LLC · Yegor Artsev",
  description:
    "Three shipped mobile titles. Level design, raids, atmosphere and the mechanics I pitched that shipped.",
};

type Shot = { src: string; alt: string; caption: string };

type Game = {
  mark: string;
  title: string;
  meta: string;
  body: string;
  play: string;
  video?: string;
  shots: Shot[];
};

const GAMES: Game[] = [
  {
    mark: "🎮",
    title: "MURDERHILL",
    meta: "Released 2026 · Game & Level Designer",
    body: "I joined as level designer and grew into game design here. I pitched mechanics to the producers that were approved and shipped. I owned level design from greybox to final. This is the project where I stopped just building levels and started shaping how the game plays. Among the mechanics I pitched and shipped: a spellbook system that added variety to the standard breaker loop, alongside the light-gated navigation you can see below.",
    play: "https://play.google.com/store/apps/details?id=com.murder.hill",
    video: "/p24-mh-hero.mp4",
    shots: [
      {
        src: "/p24-mh-raid.jpg",
        alt: "MurderHill top-down raid level",
        caption:
          "Raid levels I designed: readable top-down layouts that guide the player to the objective.",
      },
      {
        src: "/p24-mh-loop.jpg",
        alt: "MurderHill resource and progression loop",
        caption: "The resource and progression loop: scavenge, upgrade, push deeper.",
      },
      {
        src: "/p24-mh-lantern.jpg",
        alt: "MurderHill light-gated navigation with lantern",
        caption:
          "Light-gated navigation: the lantern opens the way forward. One of the mechanics I pitched.",
      },
      {
        src: "/p24-mh-story.jpg",
        alt: "MurderHill character dialogue in gameplay",
        caption: "Characters and story woven into the loop, not bolted on top.",
      },
      {
        src: "/p24-mh-quest.jpg",
        alt: "MurderHill objective and quest moment",
        caption: "Objective and quest design that drives the player through the world.",
      },
    ],
  },
  {
    mark: "🧟",
    title: "ZOMBIEPUNK",
    meta: "1M+ downloads · 4.5★ · Level Designer",
    body: "A raid-style tower-defense survival game. I designed raid levels that guide players through tight 2-5 minute sessions with layout, landmarks and lighting instead of UI clutter. I built difficulty through environmental hazards (fire zones, explosive barrels) rather than stat inflation. The hospital endgame is the piece I'm proudest of: cornering players who already knew every mechanic, without a single new tool.",
    play: "https://play.google.com/store/apps/details?id=com.defender.dude",
    shots: [
      {
        src: "/p24-zp-1.jpg",
        alt: "ZombiePunk raid location",
        caption:
          "Raid locations I designed: readable layouts that lead the player without UI clutter.",
      },
      {
        src: "/p24-zp-2.jpg",
        alt: "ZombiePunk raid combat",
        caption: "Survive the waves: pacing and threat density built into each raid.",
      },
      {
        src: "/p24-zp-3.jpg",
        alt: "ZombiePunk environmental hazards",
        caption: "Difficulty from the environment and hazards, not stat inflation.",
      },
    ],
  },
  {
    mark: "☢️",
    title: "CHORNOBYL QUEST",
    meta: "500K+ downloads · 4.6★ · Level Designer",
    body: "Designed atmospheric exploration levels where the environment is the narrator. The abandoned world carries the story (a dead checkpoint, a radiation sign, a yard left mid-life), so tension and place are built into the space itself, without scripted events. Objectives and characters pull the player deeper through the Zone.",
    play: "https://play.google.com/store/apps/details?id=com.chornobyl.quest",
    shots: [
      {
        src: "/p24-ch-rescue.jpg",
        alt: "Chornobyl Quest atmospheric yard",
        caption: "Atmospheric exploration: the abandoned world tells the story.",
      },
      {
        src: "/p24-ch-checkpoint.jpg",
        alt: "Chornobyl Quest dead checkpoint and radiation sign",
        caption:
          "Environmental storytelling: a dead checkpoint and a radiation sign say it without a line of exposition.",
      },
      {
        src: "/p24-ch-interior.jpg",
        alt: "Chornobyl Quest readable interior",
        caption: "Readable interiors that guide the player toward the way out.",
      },
    ],
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="retro inline-flex items-center border border-primary/40 bg-muted px-2 py-1 text-[8px] tracking-[0.05em] text-primary">
      {children}
    </span>
  );
}

function PhoneShot({ src, alt, caption }: Shot) {
  return (
    <figure>
      <div className="relative aspect-[9/16] overflow-hidden border-2 border-[#0a0c08] bg-black shadow-[0_0_0_2px_rgba(64,145,108,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_3px)]" />
      </div>
      <figcaption className="mt-2 text-[11px] leading-snug text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function PlayButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="retro mt-6 inline-flex items-center gap-2 border-2 border-[#0a0c08] bg-primary px-4 py-2 text-[10px] text-primary-foreground transition hover:brightness-110"
    >
      ▶ Google Play
    </a>
  );
}

export default function Play24Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      {/* top bar */}
      <header className="border-b border-border px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/#work"
            className="retro text-[10px] text-primary transition-colors hover:text-foreground"
          >
            ◀ WORK
          </Link>
          <span className="retro text-[9px] text-muted-foreground">
            Yegor Artsev
          </span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 md:pt-14">
        {/* title + chips */}
        <h1 className="retro text-lg leading-relaxed sm:text-2xl md:text-3xl">
          24 PLAY LLC
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Game &amp; Level Designer</Chip>
          <Chip>2025 · Kyiv</Chip>
        </div>

        {/* hero — 24HIT studio banner */}
        <div className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden border-4 border-[#0a0c08] bg-white shadow-[0_0_0_3px_rgba(64,145,108,0.4),0_18px_40px_-18px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/p24-logo.jpg"
              alt="24HIT — 24 Play LLC"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <p className="retro mt-3 text-[9px] leading-relaxed text-muted-foreground">
            Three shipped mobile titles: level design and the mechanics I pitched
            that shipped.
          </p>
        </div>

        {/* one-liner */}
        <p className="retro mt-8 text-[11px] leading-relaxed text-primary md:text-xs">
          Three shipped mobile titles. Raids, atmosphere and the mechanics I
          pitched that made it in.
        </p>

        {/* story + role */}
        <section className="mt-12 space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="retro text-[10px] tracking-[0.16em] text-primary">
            [ THE STORY ]
          </p>
          <p>
            This is where I learned to ship. A mobile studio in Kyiv, fast pace,
            real players, real numbers. I came in to design levels and left
            having pitched mechanics that made it into a launched game. Three
            titles went out the door with my work in them.
          </p>
        </section>

        <section className="mt-12 space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="retro text-[10px] tracking-[0.16em] text-primary">
            [ MY ROLE ]
          </p>
          <p>
            Game &amp; Level Designer. I started in level design across shipped
            titles, then grew into game design on a new project when the
            producers approved and shipped the mechanics I pitched.
          </p>
        </section>

        {/* games */}
        {GAMES.map((g) => (
          <section key={g.title} className="mt-16 border-t border-border pt-10">
            <h2 className="retro text-base text-foreground md:text-lg">
              <span aria-hidden="true" className="mr-2">
                {g.mark}
              </span>
              {g.title}
            </h2>
            <p className="retro mt-2 text-[9px] tracking-[0.1em] text-primary">
              {g.meta}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
              {g.body}
            </p>

            {g.video && (
              <div className="mt-7 flex justify-center">
                <div className="relative aspect-[9/16] w-full max-w-[240px] overflow-hidden border-2 border-[#0a0c08] bg-black shadow-[0_0_0_2px_rgba(64,145,108,0.35)]">
                  <video
                    src={g.video}
                    poster="/p24-mh-hero.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
              {g.shots.map((s) => (
                <PhoneShot key={s.src} {...s} />
              ))}
            </div>

            <PlayButton href={g.play} />
          </section>
        ))}

        {/* takeaway */}
        <section className="mt-16 border-t border-border pt-10">
          <p className="retro mb-4 text-[10px] tracking-[0.16em] text-primary">
            [ THE TAKEAWAY ]
          </p>
          <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
            2.5M+ combined downloads across these titles. The lesson that
            mattered most: design that ships beats design that stays in a doc.
          </p>
        </section>

        {/* footer nav */}
        <div className="mt-12">
          <Link
            href="/#work"
            className="retro text-[10px] text-primary transition-colors hover:text-foreground"
          >
            ◀ Back to all work
          </Link>
        </div>
      </article>
    </main>
  );
}
