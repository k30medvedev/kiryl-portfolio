export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8">About</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5 text-neutral-700 leading-relaxed">
          <p>
            I&apos;m a senior Java backend engineer who also owns the platform underneath: Kubernetes
            on AWS with Terraform, Helm and FluxCD. Recent work: application security (DAST on every release, Renovate, CVE triage with reachability analysis),
            performance tests and optimizations that made individual services up to 30% faster, a
            disaster recovery exercise after which every service became safely disruptable, and
            unified logging that made production incidents faster to trace.
          </p>
          <p>
            Clear, transparent systems give more stable results than clever ones, and small
            incremental improvements add up. I weigh risk before a task starts — is there a retry,
            a fallback, a plan B — not after it breaks in production.
          </p>
          <p>
            Knowledge should be shared, not locked in one head: I&apos;m responsible for onboarding
            every new engineer on my project and built its knowledge platform from scratch.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 h-fit">
          <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 mb-4">
            At a glance
          </h3>
          <ul className="space-y-2 text-neutral-700 text-sm">
            <li>• 6+ years, Java / AWS / event-driven systems</li>
            <li>• <span className="font-semibold">Insurance domain: 2+ years</span> — insurance aggregator platform; risk &amp; asset protection for automotive / property insurance</li>
            <li>• Warsaw, Poland · B2B · Remote / Hybrid / On-site</li>
            <li>• English B2 · Russian C2 · Belarusian C2 · Polish A2</li>
            <li>• Currently: Backend &amp; Cloud Infrastructure Engineer at Godel Technologies</li>
            <li>• On-call rotation, production incidents (incident.io, Datadog)</li>
            <li>• <span className="font-semibold">AWS certified:</span>{" "}
              <a href="https://www.credly.com/badges/49ec26b1-f4c7-4c51-829b-217e4889f3c7" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-600 underline underline-offset-2">Developer – Associate</a>,{" "}
              <a href="https://www.credly.com/badges/ec5398e4-89fc-401e-96c8-68bfa4f54db4" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-600 underline underline-offset-2">Cloud Practitioner</a>
            </li>
            <li>• Daily AI-assisted delivery: Claude Code, MCP, GitLab Duo</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
