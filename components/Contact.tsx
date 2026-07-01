"use client";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Contact</h2>
        <p className="text-neutral-700">Warsaw, Poland · B2B · Contract · Remote/Hybrid/On-site</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href="mailto:k30medvedev@gmail.com" className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-4 py-2 hover:bg-white">
            <Mail className="h-5 w-5" /> k30medvedev@gmail.com
          </a>
          <a href="tel:+48698567174" className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-4 py-2 hover:bg-white">
            <Phone className="h-5 w-5" /> +48 698 567 174
          </a>
          <a href="https://github.com/k30medvedev" className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-4 py-2 hover:bg-white">
            <Github className="h-5 w-5" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/kiryl-miadzvedzeu" className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-4 py-2 hover:bg-white">
            <Linkedin className="h-5 w-5" /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
