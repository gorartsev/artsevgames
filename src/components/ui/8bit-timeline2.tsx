import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TimelineStep {
  description: string;
  icon: ReactNode;
  title: string;
}

interface Timeline2Props {
  className?: string;
  description?: string;
  steps?: TimelineStep[];
  title?: string;
}

const defaultSteps: TimelineStep[] = [
  {
    icon: "I",
    title: "Design",
    description: "Core loop, systems, spatial flow, written up in a clear GDD.",
  },
  {
    icon: "II",
    title: "Prototype",
    description: "Build it playable fast. Block out the level, test the feel.",
  },
  {
    icon: "III",
    title: "Playtest",
    description: "Watch real players. Cut what doesn't land, sharpen what does.",
  },
  {
    icon: "IV",
    title: "Ship",
    description: "Polish, pacing and the moments players actually remember.",
  },
];

export default function Timeline2({
  title = "How I Work",
  description = "From idea to playable.",
  steps = defaultSteps,
  className,
}: Timeline2Props) {
  return (
    <section className={cn("w-full px-4 py-16", className)}>
      <div className="mx-auto max-w-4xl">
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="retro mb-4 font-bold text-2xl tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="retro text-muted-foreground text-[9px]">{description}</p>
            )}
          </div>
        )}

        {/* Horizontal on desktop, vertical on mobile */}
        <div className="relative flex flex-col gap-8 md:flex-row md:gap-0">
          {/* Horizontal line (desktop) */}
          <div className="absolute top-7 right-0 left-0 hidden h-0 border-t-2 border-dashed border-border md:block" />

          {steps.map((step) => (
            <div
              className="relative flex flex-1 flex-col items-center text-center"
              key={step.title}
            >
              {/* Checkpoint */}
              <div className="retro relative z-10 mb-4 flex size-14 items-center justify-center border-2 border-primary bg-background font-bold">
                {step.icon}
              </div>

              <h3 className="retro mb-2 font-bold text-xs">{step.title}</h3>
              <p className="max-w-[160px] text-muted-foreground text-[10px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
