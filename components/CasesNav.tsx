"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Item = { id: string; label: string };

// Статичный порядок (как на странице сверху вниз). Можно править по желанию.
const STATIC_ITEMS: Item[] = [
  { id: "control-plane-notes", label: "Control-Plane" },
  { id: "shell-energy", label: "Shell Energy" },
  { id: "risk-asset-protection", label: "Risk & Asset" },
  { id: "calendar-case", label: "Calendar" },
];

export default function CasesNav() {
  const [active, setActive] = useState<string>(STATIC_ITEMS[0].id);

  // Для плавного скролла учитываем reduce-motion
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const sections = STATIC_ITEMS
      .map((it) => document.getElementById(it.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    // При загрузке — активный из hash или ближайший к центру
    const pickInitial = () => {
      const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
      const candidate = sections.find((s) => s.id === hash);
      if (candidate) {
        setActive(candidate.id);
        return;
      }
      setActive(getClosestToViewportCenter(sections));
    };
    pickInitial();

    const obs = new IntersectionObserver(
      (entries) => {
        // Выберем тот, чей центр ближе к центру viewport среди пересекающихся.
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        if (visible.length > 0) {
          setActive(getClosestToViewportCenter(visible));
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => obs.observe(el));
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) setActive(id);
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      obs.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // scroll-mt-* уже задан на секциях, поэтому block: 'start' ок
    if (prefersReducedMotion) {
      el.scrollIntoView({ block: "start" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav className="sticky top-3 z-20 mx-auto max-w-6xl px-6 py-2 mb-2" aria-label="Cases navigation">
      <ul className="flex overflow-x-auto scrollbar-thin gap-2 text-sm [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]">
        {STATIC_ITEMS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} className="shrink-0">
              <Link
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-3 py-1 border transition-colors ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                    : "border-white/10 bg-white/5 text-white/75 hover:text-white/90"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ----------------- helpers ----------------- */
function getClosestToViewportCenter(els: HTMLElement[]): string {
  const vh = typeof window !== "undefined" ? window.innerHeight || document.documentElement.clientHeight : 800;
  let bestId = els[0].id;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const el of els) {
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const dist = Math.abs(center - vh / 2);
    if (dist < bestDist) {
      bestDist = dist;
      bestId = el.id;
    }
  }
  return bestId;
}
