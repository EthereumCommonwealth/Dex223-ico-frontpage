"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_STEP_MS = 90;

/**
 * Drives two page-wide effects without wrapping every section in a client component:
 *
 * - Scroll reveal: any element with `data-reveal` gets `data-revealed` the first time it
 *   enters the viewport; CSS in global.css handles the actual transition. Children of a
 *   `data-reveal-stagger` parent are delayed one after another.
 * - Card spotlight: `.surface-hover` cards receive the pointer position as `--mx`/`--my`
 *   so a soft light can follow the cursor.
 */
export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${index * STAGGER_STEP_MS}ms`);
      });
    });

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".surface-hover");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
