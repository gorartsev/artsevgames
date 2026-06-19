import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/8bit/accordion";

export interface FAQItem {
  answer: string;
  question: string;
}

interface FAQ1Props {
  className?: string;
  description?: string;
  items?: FAQItem[];
  title?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: "What do you actually do?",
    answer:
      "Game & level design: core loops, systems, spatial flow and pacing, all documented in clear GDDs. I'm the bridge between devs and artists.",
  },
  {
    question: "What tools do you use?",
    answer:
      "Unity and Blender, plus a lot of paper prototyping. I build playable fast and write things down so the team isn't guessing.",
  },
  {
    question: "Remote or on-site?",
    answer:
      "Open to both. I've shipped working closely with a distributed team across time zones.",
  },
  {
    question: "What roles are you after?",
    answer:
      "Game designer, level designer, or technical designer at a studio building something they care about. Long term I'm aiming to lead.",
  },
  {
    question: "How do we start?",
    answer:
      "Hit 'Let's talk'. Tell me about your project and I'll show you how I'd approach the design.",
  },
];

export default function FAQ1({
  title = "FAQ",
  description = "Working with me, in short.",
  items = defaultItems,
  className,
}: FAQ1Props) {
  return (
    <section className={cn("w-full px-4 py-16", className)}>
      <div className="mx-auto max-w-2xl">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="retro mb-4 font-bold text-2xl tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="retro mx-auto max-w-xl text-muted-foreground text-[9px]">
                {description}
              </p>
            )}
          </div>
        )}

        <Accordion>
          {items.map((item, idx) => (
            <AccordionItem key={item.question} value={`faq-${idx}`}>
              <AccordionTrigger className="retro text-left text-xs">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="retro text-[9px] leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
