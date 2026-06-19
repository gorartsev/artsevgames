import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Khalifa University · VR Medical · Yegor Artsev",
  description:
    "Gamified clinical training in VR, built in Unreal Engine 5 for Meta Quest. Game Designer (contract) at Khalifa University.",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="retro inline-flex items-center border border-primary/40 bg-muted px-2 py-1 text-[8px] tracking-[0.05em] text-primary">
      {children}
    </span>
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

export default function KhalifaVrPage() {
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
          KHALIFA UNIVERSITY
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Game Designer · Contract</Chip>
          <Chip>2023–24 · NDA</Chip>
        </div>

        {/* hero */}
        <div className="mt-8">
          <Figure
            src="/khalifa-room.jpg"
            alt="VR clinical training room built in Unreal Engine 5"
            caption="The clinical training room. The space itself is the lesson."
          />
        </div>

        {/* one-liner */}
        <p className="retro text-[11px] leading-relaxed text-primary md:text-xs">
          Gamified clinical training in VR. Built in Unreal Engine 5 for Meta
          Quest.
        </p>

        <Section kicker="[ THE STORY ]">
          <p>
            This is where it started for me. My first real project, and I won it
            by answering a test task with a full concept: how a medical
            curriculum could become a place you walk into instead of a page you
            memorize. I had to learn fast and build it for real. I stayed on it
            for a year and a half, and it taught me more than anything before
            it.
          </p>
        </Section>

        <Section kicker="[ MY ROLE ]">
          <p>
            Game Designer (contract). I wrote the GDDs, designed the gameplay
            and the learning systems and led a small team (one developer, one
            artist), holding a single vision from the first concept to the
            in-engine build.
          </p>
        </Section>

        <Section kicker="[ THE PROBLEM ]">
          <p>
            Medical students drown in dense clinical material that is almost
            impossible to feel from a textbook. The brief was simple and hard:
            teach a clinical skill through space, presence and doing, not slides.
          </p>
        </Section>

        <Section kicker="[ HOW IT TEACHES ]">
          <p>
            I made the room do the teaching. Clinically accurate instruments and
            props, laid out the way they really sit in a room, so the
            environment itself carries the lesson. Information lives in the world
            on in-scene boards. A light-based hint system points the student to
            the next step without breaking immersion or cluttering their view
            with UI. I kept iterating the layout and the flow around how a
            learner actually moves, looks and reaches.
          </p>
          <Figure
            src="/khalifa-trays.jpg"
            alt="Clinically accurate instrument trays in VR"
            caption="Clinically accurate instrument trays, laid out as they really are."
          />
          <Figure
            src="/khalifa-clipboard.jpg"
            alt="In-world info board and light-based hint system in VR"
            caption="In-world info boards and a light-based hint system guide the student. No screen UI."
            ratio="aspect-[4/3]"
          />
        </Section>

        <Section kicker="[ RESULT ]">
          <p>
            I took it from a concept in a test task to working VR demos that ran
            for over a year, before the program was redirected by its funders. I
            walked away knowing how to own a product end to end and how to teach
            a person through a space.
          </p>
        </Section>

        <p className="mt-12 border-t border-border pt-6 text-xs italic text-muted-foreground">
          Most of this project lives behind an NDA. These three captures are
          what I can share.
        </p>

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
