import { useEffect, useRef, useState } from "react";

type UseOnScreenOptions = {
  rootMargin?: string;
  once?: boolean; // запуск один раз чи багато
  throttleMs?: number; // тротлінг викликів, якщо once = false
};

export function useOnScreen<T extends HTMLElement>({
  rootMargin = "0px",
  once = true,
  throttleMs = 0,
}: UseOnScreenOptions = {}) {
  const ref = useRef<T | null>(null);
  const marginRef = useRef(rootMargin);
  const onceRef = useRef(once);
  const throttleRef = useRef(throttleMs);

  const lastCall = useRef(0);
  const hasRun = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [wasEverVisible, setWasEverVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const now = Date.now();

        // Якщо вже відпрацювало один раз і режим once=true → не виконуємо повторно
        if (onceRef.current && hasRun.current) return;

        // Тротлінг
        if (now - lastCall.current < throttleRef.current) return;
        lastCall.current = now;

        if (entry.isIntersecting) {
          setIsVisible(true);
          setWasEverVisible(true);

          if (onceRef.current) {
            hasRun.current = true;
            observer.unobserve(el);
            observer.disconnect();
          }
        } else {
          if (!onceRef.current) {
            // У режимі non-once ми дозволяємо зникнення
            setIsVisible(false);
          }
        }
      },
      { rootMargin: marginRef.current },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible, wasEverVisible };
}
