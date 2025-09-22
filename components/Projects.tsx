"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
    >
      <article className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] backdrop-blur-sm shadow-soft">
        <header className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight flex-1 min-w-0">{p.title}</h3>
          <span className="text-sm text-white/60 shrink-0 whitespace-nowrap tabular-nums">{p.period}</span>
        </header>

        <p className="text-white/80">{p.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="text-xs rounded-full bg-white/10 px-2.5 py-1">{s}</li>
          ))}
        </ul>

        {p.links?.length ? (
          <div className="mt-4 flex gap-3">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="inline-flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200">
                {l.label} <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        ) : null}
      </article>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <ProjectCard key={p.title} p={p} idx={idx} />
        ))}
      </div>
    </section>
  );
}
