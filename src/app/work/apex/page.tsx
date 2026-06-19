import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "APEX Academy · Yegor Artsev",
  description:
    "A VR medical education platform I design and build end to end in Unity, across PC and VR, with Dr. Kartik RangaRaj (Khalifa University). Learn medicine by doing.",
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

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 h-2 w-2 shrink-0 bg-primary" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

export default function ApexPage() {
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
          APEX ACADEMY
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Game Designer &amp; Developer</Chip>
          <Chip>2026 to present · VR + PC</Chip>
        </div>

        {/* hero */}
        <div className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden border-4 border-[#0a0c08] bg-black shadow-[0_0_0_3px_rgba(64,145,108,0.4),0_18px_40px_-18px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/card-apex.jpg"
              alt="APEX Academy: grabbing biochemistry molecules by hand in VR"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_3px)]" />
          </div>
          <p className="retro mt-3 text-[9px] leading-relaxed text-muted-foreground">
            Learn medicine by doing. Grab the molecule with your hands.
          </p>
        </div>

        {/* one-liner */}
        <p className="retro mt-8 text-[11px] leading-relaxed text-primary md:text-xs">
          A VR medical education platform built with Dr. Kartik RangaRaj (Khalifa
          University). I design and build it end to end, across PC and VR, in
          Unity.
        </p>

        <Section kicker="[ THE STORY ]">
          <p>
            This is my flagship, the project where I do everything: design the
            experience, build it in Unity and ship it to the headset myself. The
            bet is simple. Students forget slides. They remember places and things
            they touched. So I turn medicine into spaces you walk into and systems
            you handle with your hands.
          </p>
        </Section>

        <Section kicker="[ MY ROLE ]">
          <p>
            Game Designer &amp; Developer. I design and build the VR levels and
            the platform systems, take each level from concept to a running Quest
            build and bring in collaborators where it helps. My partner Dr.
            RangaRaj drives the medical expertise and product vision.
          </p>
        </Section>

        <Section kicker="[ THE PROBLEM ]">
          <p>
            Medical students drown in dense material that is almost impossible to
            feel from a textbook and stay passive until the exam. The goal: make
            them learn by doing, inside the subject, then prove they understood
            it.
          </p>
        </Section>

        <Section kicker="[ WHAT I DID ]">
          <ul className="space-y-3">
            <Bullet>
              Designed and built interactive VR biochemistry levels where you grab
              and assemble molecules by hand instead of reading slides.
            </Bullet>
            <Bullet>
              Designed a hub-and-pathway architecture that scales to 17+ learning
              levels.
            </Bullet>
            <Bullet>
              Built EV01, a high-voltage safety procedure sim with grab, poke and
              haptic interaction.
            </Bullet>
            <Bullet>
              Designed a learning core loop (Micro → Meso → Macro) and an AI
              oral-examiner with a reliable rubric.
            </Bullet>
            <Bullet>
              Take each level from concept to a running Meta Quest build using an
              AI-assisted pipeline, keeping full control of design and code.
            </Bullet>
          </ul>
        </Section>

        {/* design diagrams */}
        <Section kicker="[ DESIGN · CORE LOOP ]">
          <Figure
            src="/apex-coreloop.svg"
            alt="APEX Academy core loop: Micro, Meso and Macro learning loops"
            caption="The learning loop: one question → one chapter → one semester."
          />
        </Section>

        <Section kicker="[ DESIGN · SYSTEMS ]">
          <Figure
            src="/apex-design.svg"
            alt="APEX Academy design document: chapter pipeline, AI examiner rubric and scoring stability"
            caption="Chapter pipeline, AI-examiner rubric and how I stabilized AI scoring from ~55% to ~85%+."
          />
        </Section>

        <Section kicker="[ RESULT ]">
          <p>
            In a recent demo to a visiting medical school, a planned 10-minute
            session ran 15-20 minutes on engagement. The project proved I can own
            a product end to end (design, build, ship) and design AI and learning
            systems that hold up in front of real users.
          </p>
        </Section>

        <Section kicker="[ STACK ]">
          <p>
            Unity 6 · C# · XR Interaction Toolkit · OpenXR · Meta Quest · hand
            tracking · Convai · PlayFab.
          </p>
        </Section>

        {/* NDA note */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs italic text-muted-foreground">
            Built with a university partner. Visuals shared with permission, some
            details stay private. More footage (EV01, the central hub and chapter
            walkthroughs) is available on request, pending partner approval.
          </p>
        </div>

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
