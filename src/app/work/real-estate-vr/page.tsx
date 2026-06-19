import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate VR / PC · Yegor Artsev",
  description:
    "Walk through an apartment that won't exist for two or three years, in VR and on PC. VR & Interactive Designer (contract).",
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

export default function RealEstateVrPage() {
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
          REAL ESTATE VR / PC
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Game Designer · VR &amp; Interactive</Chip>
          <Chip>Contract · 2025 · NDA</Chip>
        </div>

        {/* hero */}
        <div className="mt-8">
          <Figure
            src="/real-estate-bedroom.jpg"
            alt="Off-plan apartment bedroom walkthrough in VR"
            caption="A home you can walk through before a single wall is built."
          />
        </div>

        {/* one-liner */}
        <p className="retro text-[11px] leading-relaxed text-primary md:text-xs">
          Walk through an apartment that won&apos;t exist for two or three years,
          in VR and on PC.
        </p>

        <Section kicker="[ THE STORY ]">
          <p>
            Someone in Abu Dhabi was building a private real-estate venture and
            found me through a recommendation. The idea got under my skin: let a
            person feel a home before it physically exists. This was a different
            kind of design for me, not combat, not levels, but a feeling. The
            quiet moment when someone stands in an empty room and already calls
            it theirs.
          </p>
        </Section>

        <Section kicker="[ MY ROLE ]">
          <p>
            VR &amp; Interactive Designer (contract). I proposed the whole
            concept (both a PC and a VR version) and designed the walkthrough
            experience and the configurator from the ground up.
          </p>
        </Section>

        <Section kicker="[ THE PROBLEM ]">
          <p>
            How do you sell a home that doesn&apos;t exist yet, and make a buyer
            feel it is already theirs? A single fixed show-flat can&apos;t do
            that. People need to move through it, change it and recognize it as
            their own.
          </p>
        </Section>

        <Section kicker="[ FROM GREYBOX TO HOME ]">
          <p>
            I started where I always start: greybox. Blocking out the flow and
            proportions of the apartment before a single piece of furniture
            existed, so the space felt right to move through first. Then I
            modeled and dressed it, building and placing the assets that turn an
            empty shell into a home someone could imagine living in.
          </p>
        </Section>

        <Section kicker="[ WHAT I DESIGNED ]">
          <p>
            Navigable apartments with real player flow: sightlines, paths and
            framing that lead you naturally from room to room. Lighting shifts
            between natural and artificial so the same space reads at different
            times of day. And a configurator lets the buyer choose their own
            furniture, colors and finishes, turning a generic unit into the home
            they shaped themselves. Built in Unreal.
          </p>
          <Figure
            src="/real-estate-kitchen.jpg"
            alt="Kitchen render with natural and artificial lighting"
            caption="Natural flow and day-to-night lighting."
          />
          <Figure
            src="/real-estate-living.jpg"
            alt="Live navigable living room build in Unreal"
            caption="A live, navigable build. The buyer makes the space their own."
          />
        </Section>

        <Section kicker="[ RESULT ]">
          <p>
            I delivered the contracted product. It pushed me to design for
            emotion and ownership instead of mechanics. It proved I can take an
            interactive concept from idea to a finished, navigable build.
          </p>
        </Section>

        {/* NDA note + small capture */}
        <div className="mt-12 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-36 shrink-0 overflow-hidden border-2 border-[#0a0c08] bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/real-estate-contract.jpg"
              alt="Contract"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <p className="text-xs italic text-muted-foreground">
            This was contract work under NDA. These captures are what I can
            share.
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
