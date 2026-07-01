export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  caseId?: string;
};

const items: ExperienceItem[] = [
  {
    role: "Cloud Infrastructure Engineer / Backend Software Engineer",
    company: "Godel Technologies",
    period: "Jul 2025 – Present",
    bullets: [
      "Shared Kubernetes platform on AWS for several product teams (insurance domain)",
      "Focus areas: endpoint security, performance of the busiest services, observability",
      "Driving the team's AI-first adoption roadmap",
    ],
    caseId: "platform-notes",
  },
  {
    role: "Backend Software Engineer",
    company: "Godel Technologies",
    period: "2024 – 2025",
    bullets: [
      "Event-driven workflows: Step Functions, Lambda, EventBridge, SQS",
      "Team: 5 backend developers, 1 QA, 1 DevOps, 1 Tech Lead, 1 BA, 1 ADC · Scrum + Kanban",
      "−25% Lambda cost, −30% latency via optimization",
    ],
    caseId: "control-plane-notes",
  },
  {
    role: "Backend Software Engineer",
    company: "Godel Technologies",
    period: "2022 – 2024",
    bullets: [
      "Smart metering platform; hundreds of microservices",
      "Java 8 → 17, Spring 2.3 → 3.0 modernization",
      "98% bug-free releases · Scrum + Kanban hybrid",
    ],
    caseId: "shell-energy",
  },
  {
    role: "Backend Software Engineer",
    company: "SolbegSoft / Helmes Group",
    period: "2021 – 2022",
    bullets: [
      "Risk management & asset protection for automotive/property insurance",
      "Team: 1 Tech Lead + 5 developers + 1 ADC · Scrum + Kanban hybrid",
      "Migrated parts of a legacy monolith to microservices; QA hardening",
    ],
    caseId: "risk-asset-protection",
  },
  {
    role: "Backend Software Engineer",
    company: "Automotive Group — Calendar Management System",
    period: "2020 – 2021",
    bullets: [
      "Greenfield internal Google-style calendar system",
      "Sole backend engineer in a 6-person team (1 BE + 5 FE)",
      "Built from scratch in ~10 months + 2 months production support",
    ],
    caseId: "calendar-case",
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8">Experience</h2>

      <div className="relative pl-6">
        {/* timeline vertical line */}
        <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-neutral-100" />

        <ul className="space-y-10">
          {items.map((it) => (
            <li key={`${it.company}-${it.period}`} className="relative">
              {/* dot */}
              <span className="absolute left-[-2px] top-1.5 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
              <div className="ml-4">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {it.role} — <span className="text-neutral-700">{it.company}</span>
                </h3>
                <p className="text-neutral-500 text-sm mt-1">{it.period}</p>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700">
                  {it.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {it.caseId ? (
                  <a href={`#${it.caseId}`} className="mt-3 inline-block text-sm text-emerald-700 hover:text-emerald-600">
                    → Full case study
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
