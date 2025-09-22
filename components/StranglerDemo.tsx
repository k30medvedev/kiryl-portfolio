"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

type Phase = "ASSESS" | "DUAL" | "SWITCH";
type StranglerProps = { embedded?: boolean };

function phaseFrom(percent: number): Phase {
  if (percent < 30) return "ASSESS";
  if (percent < 70) return "DUAL";
  return "SWITCH";
}

export default function StranglerDemo({ embedded = false }: StranglerProps) {
  const [cutover, setCutover] = useState(25); // % to microservices
  const [paused, setPaused] = useState(false);
  const dirRef = useRef<1 | -1>(1);

  // Autoplay (slower): oscillate between 15% and 90%. Pause on hover/drag.
  useEffect(() => {
    const id = setInterval(() => {
      if (paused) return;
      setCutover((v) => {
        const next = v + dirRef.current * 0.2; // slower step
        if (next >= 90) dirRef.current = -1;
        if (next <= 15) dirRef.current = 1;
        return Math.max(0, Math.min(100, next));
      });
    }, 70); // slower tick
    return () => clearInterval(id);
  }, [paused]);

  // Smooth visuals
  const spring = useSpring(cutover, { stiffness: 120, damping: 18, mass: 0.8 });
  const monolithWidth = useTransform(spring, (v) => 10 - (v / 100) * 6); // 10 → 4
  const microWidth = useTransform(spring, (v) => 4 + (v / 100) * 8); // 4 → 12
  const monoOpacity = useTransform(spring, (v) => 1 - (v / 100) * 0.7); // 1 → 0.3
  const microOpacity = useTransform(spring, (v) => 0.45 + (v / 100) * 0.55); // 0.45 → 1

  const phase: Phase = useMemo(() => phaseFrom(cutover), [cutover]);

  return (
    <section className={`mx-auto max-w-6xl px-6 ${embedded ? "py-0" : "py-16"}`}>
      {!embedded && (
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          Strangler Fig at Shell Energy: Monolith → WebFlux Microservices
        </h2>
      )}

      <div
        className="grid lg:grid-cols-2 gap-6 items-start"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Diagram */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/70">Cutover to microservices</span>
            <span className="text-sm font-medium text-emerald-300">
              {Math.round(cutover)}%
            </span>
          </div>

          <div className="relative">
            <input
              aria-label="Cutover percent"
              type="range"
              min={0}
              max={100}
              value={cutover}
              onChange={(e) => setCutover(Number(e.target.value))}
              onMouseDown={() => setPaused(true)}
              onTouchStart={() => setPaused(true)}
              onMouseUp={() => setPaused(false)}
              onTouchEnd={() => setPaused(false)}
              className="w-full accent-emerald-400"
            />
            {!paused && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-emerald-300">
                  drag me
                </span>
              </motion.span>
            )}
          </div>

          {/* SVG canvas */}
          <div className="mt-6">
            <svg viewBox="0 0 720 360" className="w-full h-auto">
              {/* API Gateway */}
              <rect
                x="20"
                y="150"
                width="130"
                height="80"
                rx="16"
                className="fill-emerald-500/15 stroke-emerald-400/60"
                strokeWidth="2"
              />
              <text
                x="85"
                y="197"
                textAnchor="middle"
                className="fill-white"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                API Gateway
              </text>

              {/* Legacy Monolith (XML-only) */}
              <motion.g style={{ opacity: monoOpacity }}>
                <rect
                  x="245"
                  y="48"
                  width="190"
                  height="128"
                  rx="18"
                  className="fill-white/10 stroke-white/30"
                  strokeWidth="2"
                />
                <text
                  x="340"
                  y="90"
                  textAnchor="middle"
                  className="fill-white"
                  style={{ fontSize: 14, fontWeight: 800 }}
                >
                  Legacy Monolith
                </text>
                <text
                  x="340"
                  y="110"
                  textAnchor="middle"
                  className="fill-white/70"
                  style={{ fontSize: 12 }}
                >
                  XML contracts, change-frozen
                </text>
                <text
                  x="340"
                  y="128"
                  textAnchor="middle"
                  className="fill-white/60"
                  style={{ fontSize: 11 }}
                >
                  Wrapped by adapters
                </text>
              </motion.g>

              {/* Microservices cluster — contained & even paddings */}
              <motion.g style={{ opacity: microOpacity }}>
                {/* container kept inside the 720 viewBox: 520 + 200 = 720 */}
                <rect
                  x="520"
                  y="40"
                  width="200"
                  height="220"
                  rx="18"
                  className="fill-emerald-500/10 stroke-emerald-400/40"
                  strokeWidth="2"
                />
                <text
                  x="620"
                  y="66"
                  textAnchor="middle"
                  className="fill-white"
                  style={{ fontSize: 13, fontWeight: 700 }}
                >
                  WebFlux Microservices (K8s)
                </text>

                {[
                  // centers for symmetrical padding:
                  // left column: x = 520 + 12 + 38 = 570
                  // right column: x = 520 + 200 - 12 - 38 = 670
                  { x: 570, y: 95, label: "Metering API" },
                  { x: 670, y: 95, label: "Validation" },
                  { x: 570, y: 155, label: "Aggregation" },
                  { x: 670, y: 155, label: "Billing" },
                  { x: 570, y: 215, label: "Notifications" },
                  { x: 670, y: 215, label: "Reporting" },
                ].map((b, i) => (
                  <g key={i}>
                    <rect
                      x={b.x - 38}
                      y={b.y - 18}
                      width="76"
                      height="36"
                      rx="10"
                      className="fill-emerald-400/15 stroke-emerald-300/50"
                      strokeWidth="1.5"
                    />
                    <text
                      x={b.x}
                      y={b.y + 4}
                      textAnchor="middle"
                      className="fill-white"
                      style={{ fontSize: 12 }}
                    >
                      {b.label}
                    </text>
                  </g>
                ))}
              </motion.g>

              {/* Curved path: API → Monolith (white) */}
              <motion.path
                d="M150,190 Q210,130 255,115"
                className="stroke-white/80"
                style={{
                  strokeWidth: monolithWidth,
                  filter: "drop-shadow(0 0 6px rgba(255,255,255,0.25))",
                }}
                strokeLinecap="round"
                fill="none"
              />
              <ArrowHead x={255} y={115} rotation={-20} opacityBind={monoOpacity} />

              {/* Curved path: API → Microservices (green) */}
              <motion.path
                d="M150,205 Q360,235 520,175"
                className="stroke-emerald-300"
                style={{
                  strokeWidth: microWidth,
                  filter: "drop-shadow(0 0 8px rgba(16,185,129,0.35))",
                }}
                strokeLinecap="round"
                fill="none"
              />
              <ArrowHead
                x={520}
                y={175}
                rotation={0}
                color="#6ee7b7"
                opacityBind={microOpacity}
              />

              {/* Percent labels */}
              <motion.text
                x="210"
                y="150"
                className="fill-white/80"
                style={{ fontSize: 12, opacity: monoOpacity }}
              >
                {Math.max(0, 100 - cutover).toFixed(0)}% traffic
              </motion.text>
              <motion.text
                x="360"
                y="225"
                className="fill-emerald-200"
                style={{ fontSize: 12, opacity: microOpacity }}
              >
                {Math.round(cutover)}% traffic
              </motion.text>

              {/* Adapters note */}
              <text
                x="280"
                y="245"
                className="fill-white/70"
                style={{ fontSize: 11 }}
              >
                Adapters / Anti-corruption (XML over MQ/HTTP)
              </text>
            </svg>
          </div>
        </div>

        {/* Right panel: scale + responsibilities by phase */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft">
          <PhaseBadge phase={phase} />

          {/* Scale & metrics */}
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Users</p>
              <p className="text-lg font-semibold">2,200,000+</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Meters per user</p>
              <p className="text-sm">Multiple (gas + electricity)</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Observability</p>
              <p className="text-sm">RPS + hourly / daily / weekly ingestion</p>
            </div>
          </div>

          {/* Responsibilities by phase */}
          <ul className="mt-6 space-y-3 text-white/80">
            {phase === "ASSESS" && (
              <>
                <li>• Identified bounded contexts around the legacy metering monolith (read-only, XML-only contracts).</li>
                <li>• Built adapters / anti-corruption layer: XML over MQ/HTTP, schema contracts, idempotency keys.</li>
                <li>• Established observability baseline: Prometheus + Grafana (golden signals, RED/USE), structured logs.</li>
                <li>• Prepared data models for WebFlux microservices (CQRS read models for UI).</li>
              </>
            )}
            {phase === "DUAL" && (
              <>
                <li>• Event-driven flows with RabbitMQ; outbox + retry/backoff; deduplication.</li>
                <li>• Dual-write & shadow traffic; drift detection & alerts; safe comparisons.</li>
                <li>• WebFlux on Kubernetes (probes, HPA); blue/green & canary via Ingress.</li>
                <li>• Latency reduction via I/O tuning & back-pressure; standardized metrics & tracing.</li>
              </>
            )}
            {phase === "SWITCH" && (
              <>
                <li>• Gradual cutover of critical flows; decommissioned monolith endpoints with fallbacks.</li>
                <li>• Data migration & reconciliation; SLO/SLI dashboards, on-call runbooks.</li>
                <li>• Hardened CI/CD (Testcontainers, Liquibase migrations, quality gates).</li>
                <li>• Post-switch clean-ups and cost/perf tuning across services.</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Helpers */
function ArrowHead({
  x,
  y,
  rotation = 0,
  color = "#ffffff",
  opacityBind,
}: {
  x: number;
  y: number;
  rotation?: number;
  color?: string;
  opacityBind?: any;
}) {
  return (
    <motion.polygon
      points={`${x},${y} ${x - 10},${y - 6} ${x - 10},${y + 6}`}
      fill={color}
      style={opacityBind ? { opacity: opacityBind } : undefined}
      transform={`rotate(${rotation}, ${x}, ${y})`}
    />
  );
}

function PhaseBadge({ phase }: { phase: Phase }) {
  const map: Record<Phase, { label: string; cls: string }> = {
    ASSESS: { label: "Phase 1 — Assess & Extract", cls: "bg-white/5 border-white/10" },
    DUAL:   { label: "Phase 2 — Dual-write / Shadow", cls: "bg-amber-500/15 border-amber-400/30" },
    SWITCH: { label: "Phase 3 — Switch & Decommission", cls: "bg-emerald-500/15 border-emerald-400/40" },
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${map[phase].cls}`}>
      {map[phase].label}
    </span>
  );
}