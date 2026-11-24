const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#platform-notes", label: "Case studies" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="font-display text-lg font-semibold text-neutral-900 shrink-0">
          Kiryl Miadzvedzeu
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-neutral-900">{n.label}</a>
          ))}
        </nav>

        <a
          href="/Kiryl-Miadzvedzeu-CV.pdf"
          download
          className="shrink-0 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow-soft"
        >
          Download CV
        </a>
      </div>

      {/* Mobile navigation: horizontal scroll row */}
      <nav className="md:hidden border-t border-neutral-200/70" aria-label="Main mobile">
        <ul className="mx-auto max-w-6xl px-6 h-10 flex items-center gap-5 overflow-x-auto text-sm text-neutral-600 whitespace-nowrap">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="hover:text-neutral-900">{n.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
