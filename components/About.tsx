export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8">About</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5 text-neutral-700 leading-relaxed">
          <p>
            For me the point of the job is solving real business problems, not just writing code —
            and good agile practice is how that actually happens. Refinements, retrospectives, and
            three-amigos sessions matter, because that&apos;s where misunderstandings get cleared
            up before they turn into rework.
          </p>
          <p>
            Clear, transparent systems give more stable results than clever ones. I build things to
            be easy to reason about, and I&apos;ve found that small, incremental improvements tend
            to add up to serious results over time. I lean on my team and trust it, while everyone
            keeps individual ownership of their own work — knowledge is best shared openly rather
            than locked in one person&apos;s head.
          </p>
          <p>
            Risk is best weighed before a task is taken on, not after. As a backend engineer,
            &quot;what happens if this goes wrong&quot; is always running in the background — is
            there a plan B, a retry, a fallback, thought through from the start.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 h-fit">
          <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 mb-4">
            At a glance
          </h3>
          <ul className="space-y-2 text-neutral-700 text-sm">
            <li>• 6+ years, Java / AWS / event-driven systems</li>
            <li>• Warsaw, Poland · B2B · Remote / Hybrid / On-site</li>
            <li>• English B2 · Russian C2 · Belarusian C2 · Polish A2</li>
            <li>• Currently: Cloud Infrastructure &amp; Backend Engineer at Godel Technologies</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
