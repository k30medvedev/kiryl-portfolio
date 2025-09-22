"use client";
import { motion } from "framer-motion";

/**
 * Control-Plane notes: architecture + decisions + metrics.
 * Replaces the memory-vs-duration chart with "Cold starts vs p95".
 */
export default function ControlPlaneNotes() {
  return (
    <section
      id="control-plane-notes"
      className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target"
    >
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
       Control-Plane
      </h2>

      <p className="text-white/85 max-w-3xl">
        <strong>Project.</strong> Multi-tenant control-plane to orchestrate tenant lifecycle
        (onboarding, changes, offboarding) with <strong>AWS Step Functions</strong> for orchestration,{" "}
        <strong>Lambda</strong> for compute, <strong>EventBridge</strong> for scheduling/triggers, and{" "}
        <strong>SQS (+DLQ)</strong> for decoupling. Strong idempotency (“exactly-once perception”),
        retries with jitter/backoff, compensations for saga steps, and end-to-end observability.
      </p>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        {/* Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-lg font-semibold mb-3">Orchestration overview</h3>
          <svg viewBox="0 0 720 360" className="w-full h-auto">
            {/* EventBridge */}
            <rect x="20" y="30" width="150" height="60" rx="12" className="fill-white/5 stroke-white/20" strokeWidth="2" />
            <text fill="currentColor" x="95" y="65" textAnchor="middle" className="text-white" style={{ fontSize: 12, fontWeight: 600 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              EventBridge (triggers)
            </text>

            {/* Step Functions */}
            <rect x="200" y="20" width="320" height="320" rx="16" className="fill-white/5 stroke-white/20" strokeWidth="2" />
            <text fill="currentColor" x="360" y="45" textAnchor="middle" className="text-white" style={{ fontSize: 12, fontWeight: 600 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              Step Functions — Saga
            </text>

            <RectLabel x={230} y={70}  w={120} h={44} label="Validate Input" />
            <RectLabel x={230} y={140} w={120} h={44} label="Load Tenant" sub="DynamoDB" />

            {/* fan-out/fan-in */}
            <rect x="230" y="210" width="240" height="60" rx="12" className="fill-emerald-500/10 stroke-emerald-400/40" strokeWidth="2" />
            <text fill="currentColor" x="350" y="235" textAnchor="middle" className="text-white" style={{ fontSize: 11, fontWeight: 600 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              Parallel (fan-out / fan-in)
            </text>
            <text fill="currentColor" x="350" y="252" textAnchor="middle" className="text-emerald-300" style={{ fontSize: 11 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              Provision • ConfigureBilling • Notify
            </text>

            <Arrow x1={80}  y1={90}  x2={200} y2={90} />
            <Arrow x1={290} y1={114} x2={290} y2={140} />
            <Arrow x1={290} y1={184} x2={290} y2={210} />

            {/* SQS + DLQ */}
            <rect x="550" y="70" width="150" height="70" rx="12" className="fill-white/5 stroke-white/20" strokeWidth="2" />
            <text fill="currentColor" x="625" y="95" textAnchor="middle" className="text-white" style={{ fontSize: 12, fontWeight: 600 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              SQS queues
            </text>
            <text fill="currentColor" x="625" y="113" textAnchor="middle" className="text-white/70" style={{ fontSize: 11 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              work • retry • DLQ
            </text>

            <Arrow x1={470} y1={240} x2={550} y2={180} />
            <text fill="currentColor" x="520" y="170" textAnchor="middle" className="text-white/70" style={{ fontSize: 10 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              async steps / outbox
            </text>

            {/* Compensations */}
            <rect x="550" y="230" width="150" height="60" rx="12" className="fill-amber-500/15 stroke-amber-400/40" strokeWidth="2" />
            <text fill="currentColor" x="625" y="255" textAnchor="middle" className="text-white" style={{ fontSize: 12, fontWeight: 600 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              Compensations
            </text>
            <text fill="currentColor" x="625" y="273" textAnchor="middle" className="text-amber-200" style={{ fontSize: 11 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              cancel/bill rollback
            </text>

            <Arrow x1={470} y1={240} x2={550} y2={260} />
          </svg>
        </motion.div>

        {/* Decisions */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Key decisions &amp; patterns</h3>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>• <span className="font-semibold">Saga orchestration</span> (retries with jitter/backoff, timeouts, circuit-breakers).</li>
            <li>• <span className="font-semibold">Idempotency</span>: request keys + DynamoDB conditional writes → exactly-once perception.</li>
            <li>• <span className="font-semibold">Fan-out/fan-in</span> via Parallel; async jobs in <span className="font-semibold">SQS</span> (work/retry/DLQ) + outbox.</li>
            <li>• <span className="font-semibold">Observability</span>: structured logs, RED/USE, X-Ray, canaries; SLO/SLI dashboards.</li>
            <li>• <span className="font-semibold">Testing</span>: Unit testing, Integration, E2E.</li>
            <li>• <span className="font-semibold">Code coverage</span>: 100% </li>
            <li>• <span className="font-semibold">Hardening</span>: exponential backoff + jitter, poison-pill quarantine, dedupe, DLQ alarms.</li>
          </ul>
        </div>

        {/* Chart 1: Cold starts vs p95 */}
        <ChartCard title="Cold starts vs p95 — Provisioned Concurrency enabled">
          <ColdStartsChart />
        </ChartCard>

        {/* Chart 2: p95 per step (before/after) */}
        <ChartCard title="p95 latency per step — before vs after (ms)">
          <BarChart
            steps={["Validate", "Provision", "Billing", "Notify"]}
            before={[420, 820, 600, 300]}
            after={[320, 560, 420, 210]}
          />
          <p className="mt-2 text-sm text-white/70">
            ~<strong>−30% p95</strong> via batching, payload slimming, fewer network hops and waits.
          </p>
        </ChartCard>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">My role</h3>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>• Designed state machines, compensations, and idempotency strategies.</li>
            <li>• Implemented Lambda handlers, SQS consumers, and inter-service contracts.</li>
            <li>• Performance/cost tuning (Provisioned Concurrency, batching, memory tuning).</li>
            <li>• Dashboards/alerts and on-call runbooks; cutovers and post-mortems.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- small building blocks ---------- */
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 overflow-visible">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function RectLabel({
  x, y, w, h, label, sub,
}: { x: number; y: number; w: number; h: number; label: string; sub?: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={10} className="fill-white/10 stroke-white/30" strokeWidth="1.5" />
      <text fill="currentColor" x={x + w / 2} y={y + 20} textAnchor="middle" className="text-white" style={{ fontSize: 11, fontWeight: 600 }}
        stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
        {label}
      </text>
      {sub && (
        <text fill="currentColor" x={x + w / 2} y={y + 35} textAnchor="middle" className="text-white/70" style={{ fontSize: 10 }}
          stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
          {sub}
        </text>
      )}
    </>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-emerald-300" strokeWidth="4" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${x2 - 8},${y2 - 5} ${x2 - 8},${y2 + 5}`} fill="#6ee7b7" />
    </>
  );
}

/* ---------- Cold starts vs p95 chart with HTML overlays ---------- */
function ColdStartsChart() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const pcHour = 11; // Provisioned Concurrency activation hour

  // p95: higher and noisier before PC; lower and more stable after
  const p95 = hours.map((h) =>
    h < pcHour
      ? 360 + 60 * Math.sin((Math.PI * (h + 2)) / 6) + (Math.random() - 0.5) * 35
      : 240 + 25 * Math.sin((Math.PI * (h + 1)) / 8) + (Math.random() - 0.5) * 12
  );

  // cold starts per 1k invocations: much lower after PC
  const cold = hours.map((h) =>
    h < pcHour
      ? Math.max(15, 60 + 20 * Math.sin((Math.PI * (h + 1)) / 5) + (Math.random() - 0.5) * 10)
      : Math.max(0, 4 + 2 * Math.sin((Math.PI * (h + 1)) / 7) + (Math.random() - 0.5) * 2)
  );

  // layout
  const W = 640, H = 260;
  const PAD_L = 48, PAD_R = 56, PAD_B = 40, PAD_T = 96; // tall top for overlays

  const minLatency = 160, maxLatency = 500;
  const maxCold = 100;

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const x = (i: number) => PAD_L + (i * innerW) / (hours.length - 1);
  const yL = (ms: number) => PAD_T + innerH - ((ms - minLatency) / (maxLatency - minLatency)) * innerH;
  const yR = (v: number) => PAD_T + innerH - (v / maxCold) * innerH;

  const p95Path = p95.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${yL(v)}`).join(" ");

  return (
    <div className="relative">
      {/* overlays (HTML) */}
      <div className="pointer-events-none absolute left-4 top-2 flex items-center gap-6 text-xs">
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/15">
          <span className="inline-block w-4 h-1 rounded bg-emerald-300" />
          <span className="text-white/85">p95 response</span>
        </span>
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/15">
          <span className="inline-block w-4 h-1 rounded bg-red-400" />
          <span className="text-white/85">Cold starts (per 1k)</span>
        </span>
      </div>


      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible block" preserveAspectRatio="xMidYMid meet">
        {/* axes */}
        <line x1={PAD_L} y1={PAD_T + innerH} x2={PAD_L + innerW} y2={PAD_T + innerH} className="stroke-white/20" />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + innerH} className="stroke-white/20" />

        {/* cold-start bars (right axis) */}
        {hours.map((h) => {
          const barW = innerW / hours.length - 4;
          const bx = x(h) - barW / 2;
          const by = yR(cold[h]);
          return (
            <rect
              key={`c-${h}`}
              x={bx}
              y={by}
              width={barW}
              height={PAD_T + innerH - by}
              className={h < pcHour ? "fill-red-500/55" : "fill-red-400/35"}
            />
          );
        })}

        {/* p95 line */}
        <path d={p95Path} className="stroke-emerald-300" strokeWidth="2.5" fill="none" />

        {/* SLO */}
        <line
          x1={PAD_L}
          y1={yL(300)}
          x2={PAD_L + innerW}
          y2={yL(300)}
          className="stroke-emerald-300"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />
        <text fill="currentColor" x={PAD_L + innerW - 6} y={yL(300) - 6} textAnchor="end" className="text-emerald-300" style={{ fontSize: 11 }}
          stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
          SLO p95 ≤ 300 ms
        </text>

        {/* Provisioned Concurrency marker line only */}
        <line
          x1={x(pcHour)}
          y1={PAD_T}
          x2={x(pcHour)}
          y2={PAD_T + innerH}
          className="stroke-emerald-300"
          strokeDasharray="4 6"
          strokeWidth="2"
        />

        {/* axis labels (left) */}
        {[200, 260, 320, 380, 440].map((v) => (
          <g key={`yl-${v}`}>
            <line x1={PAD_L - 4} y1={yL(v)} x2={PAD_L} y2={yL(v)} className="stroke-white/30" />
            <text fill="currentColor" x={PAD_L - 8} y={yL(v) + 4} textAnchor="end" className="text-white/70" style={{ fontSize: 11 }}
              stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
              {v}
            </text>
          </g>
        ))}
        <text fill="currentColor" x={PAD_L - 32} y={PAD_T - 12} textAnchor="start" className="text-white/60" style={{ fontSize: 11 }}
          stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
          ms (p95)
        </text>

        {/* axis labels (right) */}
        {[0, 25, 50, 75, 100].map((v) => (
          <text key={`yr-${v}`} fill="currentColor" x={PAD_L + innerW + 28} y={yR(v) + 4} textAnchor="middle" className="text-white/60" style={{ fontSize: 11 }}
            stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
            {v}
          </text>
        ))}
        <text fill="currentColor" x={PAD_L + innerW + 28} y={PAD_T - 12} textAnchor="middle" className="text-white/60" style={{ fontSize: 11 }}
          stroke="#000" strokeWidth={2} strokeOpacity={0.35} paintOrder="stroke">
          cold / 1k invocations
        </text>
      </svg>
    </div>
  );
}

/* ---------- bar chart (before/after) ---------- */
function BarChart({
  steps,
  before,
  after,
}: {
  steps: string[];
  before: number[];
  after: number[];
}) {
  const W = 640, H = 260;
  const PAD_L = 48, PAD_R = 48, PAD_B = 40, PAD_T = 32;

  const maxY = Math.max(...before, ...after) * 1.2;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const band = innerW / steps.length;
  const barW = band * 0.32;
  const y = (v: number) => PAD_T + innerH - (v / maxY) * innerH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" preserveAspectRatio="xMidYMid meet">
      <line x1={PAD_L} y1={PAD_T + innerH} x2={PAD_L + innerW} y2={PAD_T + innerH} className="stroke-white/20" />
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + innerH} className="stroke-white/20" />
      {steps.map((s, i) => {
        const x0 = PAD_L + i * band;
        return (
          <g key={s}>
            <rect
              x={x0 + band * 0.2}
              y={y(before[i])}
              width={barW}
              height={PAD_T + innerH - y(before[i])}
              className="fill-white/40"
            />
            <rect
              x={x0 + band * 0.2 + barW + 6}
              y={y(after[i])}
              width={barW}
              height={PAD_T + innerH - y(after[i])}
              className="fill-emerald-400/60"
            />
            <text fill="currentColor"
              x={x0 + band * 0.5}
              y={PAD_T + innerH + 16}
              textAnchor="middle"
              className="text-white/70"
              style={{ fontSize: 10 }}
              stroke="#000" strokeWidth={1.5} strokeOpacity={0.35} paintOrder="stroke"
            >
              {s}
            </text>
          </g>
        );
      })}
      <rect
        x={W - PAD_R - 150}
        y={PAD_T}
        width="140"
        height="36"
        rx="8"
        className="fill-white/5 stroke-white/15"
        strokeWidth="1"
      />
      <circle cx={W - PAD_R - 135} cy={PAD_T + 12} r="5" className="fill-white/70" />
      <text fill="currentColor" x={W - PAD_R - 120} y={PAD_T + 15} className="text-white/80" style={{ fontSize: 11 }}
        stroke="#000" strokeWidth={1.5} strokeOpacity={0.35} paintOrder="stroke">
        before
      </text>
      <circle cx={W - PAD_R - 135} cy={PAD_T + 26} r="5" className="fill-emerald-400/80" />
      <text fill="currentColor" x={W - PAD_R - 120} y={PAD_T + 29} className="text-white/80" style={{ fontSize: 11 }}
        stroke="#000" strokeWidth={1.5} strokeOpacity={0.35} paintOrder="stroke">
        after
      </text>
    </svg>
  );
}
