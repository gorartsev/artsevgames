import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Temple of the Mind · Yegor Artsev",
  description:
    "A first-person puzzle adventure. Two levels, no HUD, no waypoints. Light, props and space teach the player. Solo game and level design in Unity.",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="retro inline-flex items-center border border-primary/40 bg-muted px-2 py-1 text-[8px] tracking-[0.05em] text-primary">
      {children}
    </span>
  );
}

function Section({
  kicker,
  children,
}: {
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <p className="retro mb-4 text-[10px] tracking-[0.16em] text-primary">
        {kicker}
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
        {children}
      </div>
    </section>
  );
}

function Figure({
  src,
  alt,
  caption,
  ratio = "aspect-video",
}: {
  src: string;
  alt: string;
  caption: string;
  ratio?: string;
}) {
  return (
    <figure className="my-7">
      <div
        className={`relative overflow-hidden border-4 border-[#0a0c08] bg-black shadow-[0_0_0_3px_rgba(64,145,108,0.4),0_18px_40px_-18px_rgba(0,0,0,0.5)] ${ratio}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_3px)]" />
      </div>
      <figcaption className="retro mt-3 text-[9px] leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

type Shot = { src: string; alt: string };

function ShotGrid({ shots, caption }: { shots: Shot[]; caption: string }) {
  return (
    <figure className="my-7">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {shots.map((s) => (
          <div
            key={s.src}
            className="relative aspect-video overflow-hidden border-2 border-[#0a0c08] bg-black shadow-[0_0_0_2px_rgba(64,145,108,0.35)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_3px)]" />
          </div>
        ))}
      </div>
      <figcaption className="retro mt-3 text-[9px] leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function TempleOfMindPage() {
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
          TEMPLE OF THE MIND
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Game &amp; Level Designer</Chip>
          <Chip>Personal · Unity URP · PC</Chip>
          <Chip>In dev</Chip>
        </div>

        {/* hero — YouTube walkthrough */}
        <div className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden border-4 border-[#0a0c08] bg-black shadow-[0_0_0_3px_rgba(64,145,108,0.4),0_18px_40px_-18px_rgba(0,0,0,0.5)]">
            <iframe
              src="https://www.youtube.com/embed/w7HyPbsG8Ys"
              title="Temple of the Mind walkthrough"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="retro mt-3 text-[9px] leading-relaxed text-muted-foreground">
            Walkthrough. Two levels that teach with no UI.
          </p>
        </div>

        {/* one-liner */}
        <p className="retro mt-8 text-[11px] leading-relaxed text-primary md:text-xs">
          A first-person puzzle adventure. Two levels, no HUD, no waypoints.
          Light, props and space teach the player.
        </p>

        <Section kicker="[ THE STORY ]">
          <p>
            This is my own game, from the idea up. The one I build for myself.
            No client, no brief to cut down, just the question I keep coming back
            to: how far can a space teach a player on its own, with no UI, no
            markers, no hand-holding? Temple of the Mind is my answer, and it is
            where I sharpen the craft when nobody is watching.
          </p>
        </Section>

        <Section kicker="[ MY ROLE ]">
          <p>
            Solo. The concept is mine, the idea and the design pillars, and so is
            everything built on it: game design, level design, layout, lighting,
            prop placement and the iteration from greybox to final.
          </p>
        </Section>

        <Section kicker="[ THE PROBLEM ]">
          <p>
            Strip away the HUD and the waypoints. Now make a stranger understand
            where to go, what to do and what happened here, using only the
            architecture, the light and what is left in the room.
          </p>
        </Section>

        {/* LEVEL 01 */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="retro text-base text-foreground md:text-lg">
            LEVEL 01 · ANCIENT TEMPLE
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
            A cursed ritual chamber, built in three zones: entrance corridor,
            main hall, puzzle room. Each zone teaches something before the
            central puzzle. I place the grimoire before the puzzle panel so
            players read the clue first. Green light reads as the curse, fire
            acts as a breadcrumb that draws the eye to the next step. Bodies,
            candles and broken altars tell the story of a failed ritual without a
            single line of dialogue.
          </p>

          <Figure
            src="/tom-l1-plan.jpg"
            alt="2D level plan of the ancient temple, three-zone flow"
            caption="2D layout: the three-zone flow before anything was built."
          />
          <ShotGrid
            shots={[
              { src: "/tom-l1-grey-1.jpg", alt: "Temple greybox entrance corridor" },
              { src: "/tom-l1-grey-2.jpg", alt: "Temple greybox corridor toward the curse light" },
              { src: "/tom-l1-grey-3.jpg", alt: "Temple greybox main hall overview" },
            ]}
            caption="Greybox: testing flow and sightlines first."
          />
          <ShotGrid
            shots={[
              { src: "/tom-l1-final-1.jpg", alt: "The grimoire glowing on the floor before the puzzle panel" },
              { src: "/tom-l1-final-2.jpg", alt: "Fire bowls and green light shafts in the ritual hall" },
              { src: "/tom-l1-final-3.jpg", alt: "Final lit main hall of the cursed temple" },
            ]}
            caption="Final pass: light and props carry the lesson. The grimoire sits before the panel, fire leads the eye, green light marks the curse."
          />
        </section>

        {/* LEVEL 02 */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="retro text-base text-foreground md:text-lg">
            LEVEL 02 · ENCHANTED FOREST
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
            A clearing where four seasons meet, built hub-and-spoke around a
            central altar. The player collects three relics to open the gate,
            choosing the order. Dense tree lines form natural boundaries, no
            invisible walls. Each area has its own seasonal palette so the player
            always knows where they are. After the dark temple, the vibrant
            forest reads as a reward and pulls them to explore.
          </p>

          <Figure
            src="/tom-l2-plan.jpg"
            alt="2D level plan of the enchanted forest, hub-and-spoke layout"
            caption="Hub-and-spoke layout: the clearing as anchor."
          />
          <ShotGrid
            shots={[
              { src: "/tom-l2-final-1.jpg", alt: "Four seasons meeting around the forest lake" },
              { src: "/tom-l2-final-2.jpg", alt: "Summer path leading toward the distant gate" },
              { src: "/tom-l2-final-3.jpg", alt: "Lake and castle silhouette across the seasonal forest" },
            ]}
            caption="Four seasons as four readable zones."
          />
        </section>

        {/* PROCESS */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="retro text-base text-foreground md:text-lg">
            PROCESS · ITERATION
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 md:text-base">
            The forest did not work on the first try. It went through three full
            blockout rebuilds before the fourth one finally held. I kept what
            taught and read clearly, and cut everything that confused.
          </p>
          <ShotGrid
            shots={[
              { src: "/tom-proc-grey-1.jpg", alt: "Rough forest greybox, early clearing layout" },
              { src: "/tom-proc-grey-2.jpg", alt: "Rough forest greybox with placeholder relic" },
              { src: "/tom-proc-final.jpg", alt: "The final forest layout that finally worked" },
            ]}
            caption="From rough greybox to the layout that finally worked."
          />
        </section>

        {/* stack + CTA */}
        <Section kicker="[ STACK ]">
          <p>Unity URP · PC.</p>
        </Section>

        <section className="mt-12 border-t border-border pt-8">
          <p className="retro mb-3 text-[10px] tracking-[0.16em] text-primary">
            [ WANT MORE? ]
          </p>
          <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
            The full level docs and build access on request.
          </p>
          <a
            href="mailto:artsevgames@gmail.com"
            className="retro mt-6 inline-flex items-center gap-2 border-2 border-[#0a0c08] bg-primary px-4 py-2 text-[10px] text-primary-foreground transition hover:brightness-110"
          >
            ▶ Email
          </a>
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
