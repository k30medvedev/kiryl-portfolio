import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import PlatformNotes from "@/components/PlatformNotes";
import ControlPlaneNotes from "@/components/ControlPlaneNotes";
import RiskAssetCase from "@/components/RiskAssetCase";
import CasesNav from "@/components/CasesNav";

export default function Page() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Timeline />
      <CasesNav />

      {/* ---- Platform: Security, Performance & Observability (2025–Present) ---- */}
      <PlatformNotes />

      {/* ---- Control-Plane (2024–2025) ---- */}
      <ControlPlaneNotes />

      {/* ---- Shell Energy (2022–2024) ---- */}
      <section id="shell-energy" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          Notes — Shell Energy (Smart Metering Platform)
        </h2>
        <p className="text-neutral-700 max-w-3xl">
          Real-time metering for <strong>2,200,000+</strong> users; multiple meters per user
          (gas + electricity). A change-frozen XML monolith was wrapped by adapters and
          gradually strangled to WebFlux microservices on Kubernetes. Observability via
          Prometheus/Grafana with RPS and hourly/daily/weekly ingestion metrics.
        </p>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          {/* Highlights */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 mb-4">
              Highlights
            </h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• Event-driven flows with RabbitMQ; outbox + retry/backoff; deduplication.</li>
              <li>• Dual-write & shadow traffic with drift detection and safe comparisons.</li>
              <li>• WebFlux on Kubernetes (probes, HPA); blue/green & canary via Ingress.</li>
              <li>• Latency reduction via I/O tuning & back-pressure; standardized metrics & tracing.</li>
            </ul>
          </div>

          {/* My Role */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 mb-4">
              My Role
            </h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• Development of WebFlux-based microservices</li>
              <li>• Database design and creation</li>
              <li>• Data migration / “data pumping” from the monolith</li>
              <li>• Deployments and CI/CD pipelines</li>
              <li>• Writing unit and integration tests</li>
              <li>• Functional discussions with BA/Tech Lead and the team</li>
            </ul>

            <div className="mt-6">
              <a href="#platform-notes" className="text-sm text-emerald-700 hover:text-emerald-700">↑ Back to cases</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SolbegSoft / Helmes — Risk & Asset Protection (2021–2022) ---- */}
      <RiskAssetCase />

      {/* ---- Calendar (2020–2021) ---- */}
      <section id="calendar-case" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          Notes — Automotive Group (Calendar Management System)
        </h2>

        <p className="text-neutral-700 max-w-3xl">
          Internal Google-style calendar for an automotive group: schedule and manage events with filters,
          tags, and priorities; speaker profiles (photos + talk details); multi-user views for departments.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 mb-4">
              Delivery model
            </h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• Client provided brand & full design system (Figma) — strict visual parity.</li>
              <li>• Waterfall governance, but <b>monthly demos</b> with the client — feedback → iterative scope.</li>
              <li>• Sole backend engineer in a 6-person team (1 BE + 5 FE).</li>
              <li>• Built from scratch in ~10 months + 2 months production support.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 mb-4">
              My contributions
            </h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• API design (REST), authn/authz (LDAP), audit log.</li>
              <li>• Recurring events, time-zones & DST correctness; ICS export.</li>
              <li>• Priorities/tags/filters, speaker profiles (photo + talk details).</li>
              <li>• CI/CD, Testcontainers, Flyway migrations; performance tuning and caching.</li>
            </ul>

            <div className="mt-6">
              <a href="#platform-notes" className="text-sm text-emerald-700 hover:text-emerald-600">↑ Back to cases</a>
            </div>
          </div>
        </div>
      </section>

      <Projects />
      <Contact />

      <footer className="mx-auto max-w-6xl px-6 pb-12 text-sm text-neutral-500">
        © {new Date().getFullYear()} Kiryl Miadzvedzeu
      </footer>
    </main>
  );
}
