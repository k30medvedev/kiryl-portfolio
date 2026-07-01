export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="font-display text-lg font-semibold text-neutral-900 shrink-0">
          Kiryl Miadzvedzeu
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
          <a href="#about" className="hover:text-neutral-900">About</a>
          <a href="#experience" className="hover:text-neutral-900">Experience</a>
          <a href="#platform-notes" className="hover:text-neutral-900">Case studies</a>
          <a href="#projects" className="hover:text-neutral-900">Projects</a>
          <a href="#contact" className="hover:text-neutral-900">Contact</a>
        </nav>

        <a
          href="/Kiryl-Miadzvedzeu-CV.pdf"
          download
          className="shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-900 px-4 py-2 text-sm font-medium shadow-soft"
        >
          Download CV
        </a>
      </div>
    </header>
  );
}
