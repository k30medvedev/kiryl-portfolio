// components/CasesNav.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const items = [
  { id: "control-plane-notes", label: "Control-Plane" },
  { id: "shell-energy", label: "Shell Energy" },
  { id: "risk-asset-protection", label: "Risk & Asset" },
  { id: "calendar-case", label: "Calendar" },
];

export default function CasesNav() {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="sticky top-3 z-20 mx-auto max-w-6xl px-6 py-2 mb-2">
      <ul className="flex flex-wrap gap-2 text-sm">
        {items.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              className={`rounded-full px-3 py-1 border ${
                active === id
                  ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                  : "border-white/10 bg-white/5 text-white/75 hover:text-white/90"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
