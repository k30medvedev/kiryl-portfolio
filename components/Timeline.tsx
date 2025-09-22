export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

const items: ExperienceItem[] = [
  {
    role: "Backend Software Engineer",
    company: "Godel Technologies",
    period: "2024 – Present",
    bullets: [
      "Event-driven workflows: Step Functions, Lambda, EventBridge, SQS",
	  "Team setup: 5 backend developers, 1 QA, 1 DevOps, 1 Tech Lead, 1 BA, 1 ADC",
      "−25% Lambda cost, −30% latency via optimization",
      "Observability with CloudWatch & X-Ray",
	  "Process: Scrum mixed with Kanban for delivery flexibility",
    ],
  },
  {
    role: "Backend Software Engineer",
    company: "Godel Technologies",
    period: "2022 – 2024",
    bullets: [
      "Smart metering platform; hundreds of microservices",
      "Java 8 → 17, Spring 2.3 → 3.0 modernization",
      "Shared libraries, 98% bug-free releases with robust tests",
      "Agile workflow: Scrum + Kanban hybrid",
    ],
  },
  {
    role: "Backend Software Engineer",
    company: "SolbegSoft / Helmes Group",
    period: "2021 – 2022",
    bullets: [
      "Risk management & asset protection for automotive/property insurance",
      "Migrated parts of a legacy monolith to microservices; QA hardening",
	  "Team setup: 1 Tech Lead + 5 developers + 1 ADC",
	  "Agile workflow: Scrum + Kanban hybrid",
    ],
  },
  {
    role: "Backend Software Engineer",
    company: "Automotive Group — Calendar Management System",
    period: "2020 – 2021",
    bullets: [
      "Greenfield internal Google-style calendar (events, filters/tags/priorities, speaker profiles with photo & talk details)",
      "Sole backend engineer in a 6-person team (1 BE + 5 FE)",
	  "Team setup: 9 backend developers, 1 ADC, 1 Tech Lead",
      "Built from scratch in ~10 months + 2 months production support",
	  "Process: Scrum ceremonies with Kanban flow for tasks",
    ],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Experience</h2>

      <div className="relative pl-6">
        {/* timeline vertical line */}
        <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-white/10" />

        <ul className="space-y-10">
          {items.map((it) => (
            <li key={`${it.company}-${it.period}`} className="relative">
              {/* dot */}
              <span className="absolute left-[-2px] top-1.5 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
              <div className="ml-4">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {it.role} — <span className="text-white/80">{it.company}</span>
                </h3>
                <p className="text-white/60 text-sm mt-1">{it.period}</p>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-white/85">
                  {it.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
