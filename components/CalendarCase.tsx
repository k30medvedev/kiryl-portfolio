"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Prio = "Low" | "Med" | "High";
type SpeakerId = "bs" | "hm";

type EventItem = {
  title: string;
  tag: string;
  prio: Prio;
  speakers?: SpeakerId[];
};

type DayCell = { num?: number }; // undefined = пустая ячейка

const SPEAKERS: Record<SpeakerId, { initials: string; name: string; role: string }> = {
  bs: { initials: "BS", name: "Ben Smart", role: "CEO" },
  hm: { initials: "HM", name: "Helena Mall", role: "Speaker" },
};

export default function CalendarCase() {
  // Пример месяца: 1-е начинается в среду
  const monthOffset = 2; // 0=Mon … 6=Sun
  const monthDays = 30;

  const days: DayCell[] = useMemo(() => {
    const blanks = Array.from({ length: monthOffset }, () => ({}));
    const nums = Array.from({ length: monthDays }, (_, i) => ({ num: i + 1 }));
    const total = monthOffset + monthDays;          // сколько занято
    const target = Math.ceil(total / 7) * 7;        // ближайшее кратное 7
    const pad = target - total;                     // добивка пустыми
    return [...blanks, ...nums, ...Array.from({ length: pad }, () => ({}))];
  }, [monthOffset, monthDays]);

  // События месяца + кто выступает
  const events: Record<number, EventItem[]> = {
    3: [{ title: "Design Review", tag: "UX", prio: "Med", speakers: ["hm"] }],
    7: [{ title: "Board Meeting", tag: "Exec", prio: "High", speakers: ["bs"] }],
    9: [{ title: "Press Briefing", tag: "PR", prio: "Med", speakers: ["hm"] }],
    14: [{ title: "Product Demo", tag: "Launch", prio: "High", speakers: ["bs", "hm"] }],
    18: [{ title: "Dept. Standup", tag: "Internal", prio: "Low" }],
    22: [{ title: "Partner Sync", tag: "Partner", prio: "Med", speakers: ["hm"] }],
    27: [{ title: "Town Hall", tag: "All-hands", prio: "High", speakers: ["bs", "hm"] }],
  };

  // Режим: месяц / неделя
  type Mode = "month" | "week";
  const [mode, setMode] = useState<Mode>("month");

  const weeks: DayCell[][] = useMemo(() => {
    const w: DayCell[][] = [];
    for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7));
    return w;
  }, [days]);

  const defaultWeekIndex = useMemo(() => {
    const idx = weeks.findIndex((wk) => wk.some((d) => d.num === 14));
    return idx >= 0 ? idx : 0;
  }, [weeks]);
  const [weekIndex, setWeekIndex] = useState<number>(defaultWeekIndex);

  const weekLabel = useMemo(() => {
    const wk = weeks[weekIndex] ?? [];
    const nums = wk.map((d) => d.num).filter(Boolean) as number[];
    return nums.length ? `${nums[0]}–${nums[nums.length - 1]}` : "";
  }, [weeks, weekIndex]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
      {/* TOP BAR */}
      <div className="relative z-20 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setMode("month")}
            className={`rounded-full px-2 py-1 ${mode === "month" ? "bg-white/10" : "bg-white/10 opacity-60 hover:opacity-80"}`}
            aria-pressed={mode === "month"}
            aria-label="Switch to month view"
          >
            Month
          </button>
          <button
            onClick={() => setMode("week")}
            className={`rounded-full px-2 py-1 ${mode === "week" ? "bg-white/10" : "bg-white/10 opacity-60 hover:opacity-80"}`}
            aria-pressed={mode === "week"}
            aria-label="Switch to week view"
          >
            Week
          </button>
        </div>

        {mode === "week" && (
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setWeekIndex((w) => Math.max(0, w - 1))}
              className="rounded-full bg-white/10 px-2 py-1 hover:bg-white/15"
              aria-label="Prev week"
            >
              ‹
            </button>
            <span className="rounded-full bg-white/10 px-2 py-1" aria-live="polite">{weekLabel}</span>
            <button
              onClick={() => setWeekIndex((w) => Math.min(weeks.length - 1, w + 1))}
              className="rounded-full bg-white/10 px-2 py-1 hover:bg-white/15"
              aria-label="Next week"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Заголовок дней недели */}
      <div className="relative z-10 grid grid-cols-7 text-center text-xs text-white/60 mb-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* GRID */}
      <AnimatePresence mode="wait">
        {mode === "month" ? (
          <motion.div
            key="month"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {/* className перенесён внутрь для совместимости с типами framer-motion */}
            <div className="relative z-10 grid grid-cols-7 gap-[6px]">
              {days.map((day, i) => (
                <DayCellView key={i} day={day} events={events[day.num ?? -1]} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="week"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative z-10 grid grid-cols-7 gap-[6px]">
              {(weeks[weekIndex] ?? []).map((day, i) => (
                <DayCellView key={i} day={day} events={events[day.num ?? -1]} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Легенда внизу */}
      {mode === "month" && (
        <div className="relative z-10 mt-3 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-emerald-500/15 border border-emerald-400/40 px-2 py-1">Tag</span>
          <span className="rounded-full bg-amber-500/15 border border-amber-400/40 px-2 py-1">Priority</span>
          <span className="rounded-full bg-white/10 px-2 py-1">Speaker</span>
        </div>
      )}
    </div>
  );
}

/* ----------------- helpers ----------------- */

function DayCellView({
  day,
  events,
}: {
  day: DayCell;
  events?: EventItem[];
}) {
  const list = events ?? [];
  return (
    <div className="min-h-[92px] rounded-lg border border-white/10 bg-white/5 p-1.5">
      <div className="text-[11px] text-white/60">{day.num ?? ""}</div>
      <div className="mt-1 space-y-1">
        {list.map((ev, k) => (
          <EventPill key={k} ev={ev} />
        ))}
      </div>
    </div>
  );
}

function EventPill({ ev }: { ev: EventItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-md bg-white/10 px-1.5 py-1"
      aria-label={`${ev.title} — ${ev.tag} (${ev.prio})`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] leading-tight">{ev.title}</span>

        {/* Аватары спикеров внутри события */}
        {ev.speakers && ev.speakers.length > 0 && (
          <div className="flex -space-x-1">
            {ev.speakers.map((sid) => {
              const s = SPEAKERS[sid];
              return (
                <div key={sid} className="relative group/avatar">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/20 text-[10px] font-semibold">
                    {s.initials}
                  </div>
                  {/* тултип по спикеру */}
                  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[11px] text-white/90 opacity-0 transition-opacity group-hover/avatar:opacity-100">
                    <b>{s.role}</b> — {s.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-0.5 flex items-center justify-between">
        <span className="text-[10px] text-emerald-300">{ev.tag}</span>
        <span className="text-[10px] text-white/60">{ev.prio}</span>
      </div>

      {/* общий тултип события */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute left-0 top-full z-10 mt-1 w-max max-w-[240px] rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[11px] text-white/90 shadow-lg"
        >
          <div>
            <b>{ev.title}</b>
          </div>
          <div className="text-white/70">Tag: {ev.tag}</div>
          <div className="text-white/70">Priority: {ev.prio}</div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
