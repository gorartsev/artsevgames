import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Freelance · Yegor Artsev",
  description:
    "Independent game design: two games built from scratch, plus design consulting on live free-to-play mobile titles. Concept, GDD, systems, balance and data-driven features.",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="retro inline-flex items-center border border-primary/40 bg-muted px-2 py-1 text-[8px] tracking-[0.05em] text-primary">
      {children}
    </span>
  );
}

function PhoneVideo({
  src,
  poster,
  caption,
  big = false,
}: {
  src: string;
  poster: string;
  caption: string;
  big?: boolean;
}) {
  return (
    <figure className="flex flex-col items-center">
      <div
        className={`relative aspect-[9/16] w-full overflow-hidden border-2 border-[#0a0c08] bg-black shadow-[0_0_0_2px_rgba(64,145,108,0.35)] ${
          big ? "max-w-[280px]" : "max-w-[240px]"
        }`}
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <figcaption className="retro mt-3 max-w-[280px] text-center text-[9px] leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-7">
      <div className="relative overflow-hidden border-4 border-[#0a0c08] bg-black shadow-[0_0_0_3px_rgba(64,145,108,0.4),0_18px_40px_-18px_rgba(0,0,0,0.5)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="block h-auto w-full"
          draggable={false}
        />
      </div>
      <figcaption className="retro mt-3 text-[9px] leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function StatusLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="retro mt-6 inline-flex items-center gap-2 border border-primary/40 bg-muted px-3 py-1 text-[9px] tracking-[0.06em] text-primary">
      {children}
    </p>
  );
}

function StoreButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="retro mt-3 inline-flex items-center gap-2 border-2 border-[#0a0c08] bg-primary px-4 py-2 text-[10px] text-primary-foreground transition hover:brightness-110"
    >
      ▶ App Store
    </a>
  );
}

export default function FreelancePage() {
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
          FREELANCE
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Game Designer</Chip>
          <Chip>2025–26 · Remote</Chip>
        </div>

        {/* hero video */}
        <div className="mt-8 flex justify-center">
          <PhoneVideo
            src="/fl-bcz-hero.mp4"
            poster="/fl-bcz-hero.jpg"
            caption="Independent design: two games from zero, plus live-game consulting."
            big
          />
        </div>

        {/* one-liner */}
        <p className="retro mt-8 text-[11px] leading-relaxed text-primary md:text-xs">
          Two games designed from scratch, plus design consulting on live mobile
          titles.
        </p>

        <section className="mt-12 space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="retro text-[10px] tracking-[0.16em] text-primary">
            [ THE STORY ]
          </p>
          <p>
            After the studio, I went solo for a while. Two games built from
            scratch, and live mobile titles I came in to sharpen. No team to hide
            behind. Just my design and whether it held up when people actually
            played it.
          </p>
        </section>

        <section className="mt-12 space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="retro text-[10px] tracking-[0.16em] text-primary">
            [ MY ROLE ]
          </p>
          <p>
            Game Designer (freelance). On my own builds I owned the concept, the
            full GDD, the systems and the balance, working with a developer to
            ship them. As a consultant I designed features and ran playtests
            against real live-game data.
          </p>
        </section>

        {/* BITE CLUB Z */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="retro text-base text-foreground md:text-lg">
            <span aria-hidden="true" className="mr-2">
              🚌
            </span>
            BITE CLUB Z
          </h2>
          <p className="retro mt-2 text-[9px] tracking-[0.1em] text-primary">
            Designed from scratch · pitched to publishers
          </p>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
            A school bus, a zombie apocalypse, ten cities to a safe haven. The
            design problem I am proudest of: combine tower-defense and
            Vampire-Survivors loops on one thumb without turning it into chaos.
            Runners attack the player and die to player weapons. Rams ignore you
            and charge the bus and only turrets stop them, so optimizing against
            one threat makes the other more dangerous. I solved the overload by
            separating the two attention modes in time across waves: learn, then
            build, then combine. That is the difference between a game that exists
            in the store and a game you actually replay.
          </p>

          <div className="mt-8 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
            <PhoneVideo
              src="/fl-bcz-combat.mp4"
              poster="/fl-bcz-combat.jpg"
              caption="Dual-threat combat in motion. Two problems, two tools."
            />
            <PhoneVideo
              src="/fl-bcz-waves.mp4"
              poster="/fl-bcz-waves.jpg"
              caption="Wave pacing: learn, build, combine."
            />
          </div>

          <Figure
            src="/fl-bcz-coreloop.jpg"
            alt="Bite Club Z core loop and meta loop diagram"
            caption="Core loop and meta loop: survive the waves, then carry progress city to city."
          />
          <Figure
            src="/fl-bcz-economy.jpg"
            alt="Bite Club Z economy design document"
            caption="F2P economy: drop rates, zone risk and an anti-frustration savings system."
          />

          <StatusLine>IN DEV · publisher pitch</StatusLine>
        </section>

        {/* ORBITJUMP */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="retro text-base text-foreground md:text-lg">
            <span aria-hidden="true" className="mr-2">
              🛸
            </span>
            ORBITJUMP
          </h2>
          <p className="retro mt-2 text-[9px] tracking-[0.1em] text-primary">
            Endless runner · designed from zero
          </p>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
            A hyper-casual endless runner I designed from the ground up: core
            loop, level structure and game feel. A small, focused build to test a
            clean one-more-run hook.
          </p>

          <Figure
            src="/fl-oj-coreloop.svg"
            alt="OrbitJump core loop and meta loop diagram"
            caption="Core loop and meta loop: every run earns coins, no run is wasted."
          />
          <Figure
            src="/fl-oj-design.svg"
            alt="OrbitJump design document: planet types, fuel economy and difficulty waves"
            caption="Design excerpt: planet types, fuel economy and difficulty waves."
          />

          <StatusLine>PROTOTYPE</StatusLine>
        </section>

        {/* DESIGN CONSULTING */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="retro text-base text-foreground md:text-lg">
            <span aria-hidden="true" className="mr-2">
              🎯
            </span>
            DESIGN CONSULTING
          </h2>
          <p className="retro mt-2 text-[9px] tracking-[0.1em] text-primary">
            Live mobile games
          </p>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
            I came in on live free-to-play titles to find what was leaking
            players and money, then design the fix. Not vague advice. I played
            deep (100+ levels in one title), documented pacing, bugs and economy,
            then turned the data into concrete features.
          </p>

          <p className="retro mt-8 mb-4 text-[10px] tracking-[0.16em] text-primary">
            [ WHAT I ACTUALLY DID ]
          </p>
          <ul className="space-y-3 text-sm leading-relaxed text-foreground/85 md:text-base">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 bg-primary" aria-hidden="true" />
              <span>
                Diagnosed a churn spike everyone blamed on difficulty and traced
                it to the first ad placement, not the challenge curve. The fix was
                ad pacing, not a balance change.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 bg-primary" aria-hidden="true" />
              <span>
                Designed a 3-star rating system to give players a clear mastery
                goal and a reason to replay levels.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 bg-primary" aria-hidden="true" />
              <span>
                Designed a &ldquo;Daily Operations&rdquo; feature to pull players
                into underused content and lift day-1 to day-7 retention.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 bg-primary" aria-hidden="true" />
              <span>
                Designed sink-economy and monetization hooks that nudge players
                toward buying or renting stronger units instead of inflating
                difficulty.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 bg-primary" aria-hidden="true" />
              <span>
                Delivered feature specs with UI mockups and a list of concrete
                daily-mission objectives, ready for the team to build.
              </span>
            </li>
          </ul>

          <p className="retro mt-10 mb-4 text-[10px] tracking-[0.16em] text-primary">
            [ THE TITLES ]
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-border bg-muted/40 p-5">
              <h3 className="retro text-[11px] leading-relaxed text-foreground">
                Drone Strike Military War 3D
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                Retention and monetization design.
              </p>
              <StoreButton href="https://apps.apple.com/fi/app/drone-strike-military-war-3d/id1626711231" />
            </div>
            <div className="border border-border bg-muted/40 p-5">
              <h3 className="retro text-[11px] leading-relaxed text-foreground">
                UBoat Attack
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                Feature and economy design.
              </p>
              <StoreButton href="https://apps.apple.com/fi/app/uboat-attack/id1601984093" />
            </div>
          </div>
        </section>

        {/* footer nav */}
        <div className="mt-16">
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
