import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { AudioProvider } from "@/components/providers/audio-provider";

export const metadata: Metadata = {
  title: "Yegor Artsev · Game & Level Designer",
  description:
    "Yegor Artsev is a game & level designer who turns ideas into playable systems, spatial flow, pacing and the moments players remember.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AudioProvider>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}
