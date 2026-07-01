"use client";
import { motion } from "framer-motion";
import { Cloud, Workflow } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10">
            <div className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                <Workflow className="h-4 w-4" /> Event-driven • AWS • Java
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-medium leading-[1.05]">
                Systems that stay <span className="text-emerald-600">understandable</span> as they grow
              </h1>
              <p className="max-w-2xl text-neutral-600">
                Kiryl Miadzvedzeu — Java / Cloud Software Engineer, Warsaw. Six years building
                event-driven platforms on AWS (Step Functions, Lambda, EventBridge, DynamoDB) and
                migrating legacy monoliths into microservices without breaking what already works.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/Kiryl-Miadzvedzeu-CV.pdf" download className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-neutral-900 px-5 py-3 font-medium shadow-soft">
                  Download CV
                </a>
                <a href="#projects" className="rounded-2xl border border-neutral-300 px-5 py-3 font-medium text-neutral-800 hover:bg-white">
                  View Projects
                </a>
                <a href="#contact" className="rounded-2xl border border-neutral-300 px-5 py-3 font-medium text-neutral-800 hover:bg-white">
                  Contact
                </a>
              </div>
            </div>

            <div
              className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-3xl border-2 border-dashed border-neutral-300 bg-white/60 flex items-center justify-center text-center px-3"
              aria-hidden="true"
            >
              <span className="text-[11px] font-mono leading-tight text-neutral-400">
                photo →<br />public/avatar.jpg
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute -right-24 -top-24 opacity-30">
        <Cloud className="h-48 w-48" />
      </div>
    </section>
  );
}
