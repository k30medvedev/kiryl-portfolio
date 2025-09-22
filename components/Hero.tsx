"use client";
import { motion } from "framer-motion";
import { Cloud, FunctionSquare, Workflow } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <Workflow className="h-4 w-4" /> Event-driven • AWS • Java
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold leading-tight">
            Building scalable, observable <span className="text-emerald-400">cloud systems</span>
          </h1>
          <p className="max-w-2xl text-white/70">
            Hi, I&apos;m Kiryl Miadzvedzeu — Senior Java/AWS Engineer. I design and deliver
            event-driven platforms with Step Functions, Lambda, and DynamoDB. I love migrating
            legacy to microservices, reducing latency & cost, and adding solid observability.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="rounded-2xl bg-emerald-500/90 hover:bg-emerald-400 text-neutral-900 px-5 py-3 font-medium shadow-soft">
              View Projects
            </a>
            <a href="#contact" className="rounded-2xl border border-white/15 px-5 py-3 font-medium text-white/90 hover:bg-white/5">
              Contact
            </a>
          </div>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -right-24 -top-24 opacity-30">
        <Cloud className="h-48 w-48" />
      </div>
      <div className="pointer-events-none absolute left-12 -bottom-16 opacity-30">
       <FunctionSquare className="h-40 w-40" />
      </div>
    </section>
  );
}
