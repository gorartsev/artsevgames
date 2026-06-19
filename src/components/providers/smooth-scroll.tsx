"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { isScrollLocked, onScrollLockChange } from "./boot-lock";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<LenisRef>(null);

  // honor the shared scroll lock: while locked (boot menu / loading), Lenis is
  // stopped, which freezes the page; on unlock it resumes. Done here because
  // this component owns the Lenis instance ref directly.
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      const lenis = ref.current?.lenis;
      if (!lenis) {
        raf = requestAnimationFrame(sync); // wait until Lenis exists
        return;
      }
      if (isScrollLocked()) lenis.stop();
      else lenis.start();
    };
    sync();
    const off = onScrollLockChange(() => {
      const lenis = ref.current?.lenis;
      if (!lenis) return;
      if (isScrollLocked()) lenis.stop();
      else lenis.start();
    });
    return () => {
      cancelAnimationFrame(raf);
      off();
    };
  }, []);

  return (
    <ReactLenis
      ref={ref}
      root
      options={{
        duration: 1.15,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        // smooth-scroll to #section anchors (Work / About / Contact),
        // offset so section titles clear the fixed header
        anchors: { offset: -80 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
