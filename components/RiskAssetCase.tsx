"use client";
import { motion } from "framer-motion";

export default function RiskAssetCase() {
  return (
    <section id="risk-asset-protection" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
        SolbegSoft / Helmes — Risk & Asset Protection
      </h2>

      <p className="text-white/80 max-w-3xl">
        Protection software for automotive &amp; property insurance. We adapted the product for a
        specific region: localization &amp; compliance rules, integrations with regional systems,
        and configuration-driven feature toggles. In parallel, we migrated selected monolith parts
        to microservices and hardened QA/stability.
      </p>

      <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
        {/* Left: diagram + chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <RegionalAdaptationDiagram />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <BeforeAfterChart />
              <p className="mt-2 text-sm text-white/70">
                Fewer incidents after QA hardening &amp; adapter isolation (illustrative data).
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: my role */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-4">
            My Role
          </h3>
          <ul className="space-y-2 text-white/85">
            <li>• Adapted out-of-the-box features for a specific region (rules, locales, UX).</li>
            <li>• Built integration adapters (policy/claims), mapping &amp; validation layers.</li>
            <li>• Configuration-driven toggles (feature flags) and rules engine changes.</li>
            <li>• Helped extract modules from the monolith to microservices (contracts, endpoints).</li>
            <li>• Tests: unit/integration, contract tests for adapters.</li>
            <li>• Deployment support and functional scope discussions with BA/Tech Lead.</li>
          </ul>

          <div className="mt-6">
            <a href="#projects" className="text-sm text-emerald-300 hover:text-emerald-200">↑ Back to Projects</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- left: diagram -------------------- */
function RegionalAdaptationDiagram() {
  const W = 700, H = 320;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* backdrop */}
      <rect x="0" y="0" width={W} height={H} rx="16" className="fill-white/0" />
      <text fill="currentColor" x="24" y="28" className="text-white/75" style={{ fontSize: 12 }}>
        Regional adaptation workflow
      </text>

      {/* core product */}
      <Rounded x={36} y={56} w={210} h={80} label="Core Product" sub="OOTB features" tone="base" />
      {/* region pack */}
      <Rounded x={270} y={50} w={170} h={92} label="Region Pack" sub="locale & compliance" tone="green" />
      {/* adapters */}
      <Rounded x={470} y={56} w={190} h={80} label="Integration Adapters" sub="policy / claims / payments" tone="blue" />

      {/* arrows */}
      <Arrow x1={246} y1={96} x2={270} y2={96} />
      <Arrow x1={440} y1={96} x2={470} y2={96} />

      {/* feature flags */}
      <Rounded x={36} y={170} w={210} h={58} label="Feature Flags" sub="toggle per region" tone="gray" />
      <Arrow x1={141} y1={136} x2={141} y2={170} />

      {/* rules */}
      <Rounded x={270} y={170} w={170} h={58} label="Rules Engine" sub="product/regulatory rules" tone="gray" />
      <Arrow x1={355} y1={142} x2={355} y2={170} />

      {/* data mapping */}
      <Rounded x={470} y={170} w={190} h={58} label="Mapping & Validation" sub="schemas • checks" tone="gray" />
      <Arrow x1={565} y1={136} x2={565} y2={170} />

      {/* external systems */}
      <text fill="currentColor" x={565} y={260} textAnchor="middle" className="text-white/70" style={{ fontSize: 11 }}>
        Regional systems
      </text>
      <g>
        <SmallPill x={502} y={270} label="Underwriting" />
        <SmallPill x={590} y={270} label="Payments" />
        <SmallPill x={540} y={298} label="DMV/Registry" />
      </g>
      <Arrow x1={565} y1={228} x2={565} y2={270} />

      {/* legend */}
      <Legend
        items={[
          { label: "flow", swatch: "#6ee7b7" },
          { label: "product", swatch: "#ffffff66" },
          { label: "region pack", swatch: "#10b98144" },
          { label: "adapters", swatch: "#60a5fa44" },
        ]}
        x={24}
        y={H - 18}
      />
    </svg>
  );
}

/* -------------------- small chart -------------------- */
function BeforeAfterChart() {
  const W = 700, H = 180, PAD = 40;
  const releases = ["R1", "R2", "R3", "R4", "R5"];
  const before = [18, 16, 14, 15, 13]; // incidents per release (illustrative)
  const after  = [10, 8, 7, 6, 6];

  const maxY = Math.max(...before, ...after) * 1.2;
  const band = (W - 2 * PAD) / releases.length;
  const barW = band * 0.32;
  const y = (v: number) => H - PAD - (v / maxY) * (H - 2 * PAD);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} className="stroke-white/20" />
      <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} className="stroke-white/20" />

      {releases.map((r, i) => {
        const x0 = PAD + i * band;
        return (
          <g key={r}>
            <rect
              x={x0 + band * 0.2}
              y={y(before[i])}
              width={barW}
              height={H - PAD - y(before[i])}
              className="fill-white/40"
            />
            <rect
              x={x0 + band * 0.2 + barW + 6}
              y={y(after[i])}
              width={barW}
              height={H - PAD - y(after[i])}
              className="fill-emerald-400/60"
            />
            <text
              fill="currentColor"
              x={x0 + band * 0.5}
              y={H - PAD + 16}
              textAnchor="middle"
              className="text-white/70"
              style={{ fontSize: 10 }}
            >
              {r}
            </text>
          </g>
        );
      })}

      {/* legend */}
      <rect x={W - PAD - 150} y={PAD} width="140" height="36" rx="8" className="fill-white/5 stroke-white/15" strokeWidth="1" />
      <circle cx={W - PAD - 135} cy={PAD + 12} r="5" className="fill-white/70" />
      <text fill="currentColor" x={W - PAD - 120} y={PAD + 15} className="text-white/80" style={{ fontSize: 11 }}>
        before
      </text>
      <circle cx={W - PAD - 135} cy={PAD + 26} r="5" className="fill-emerald-400/80" />
      <text fill="currentColor" x={W - PAD - 120} y={PAD + 29} className="text-white/80" style={{ fontSize: 11 }}>
        after
      </text>
    </svg>
  );
}

/* -------------------- primitives -------------------- */
function Rounded({
  x, y, w, h, label, sub, tone = "base",
}: { x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: "base"|"green"|"blue"|"gray" }) {
  const toneClass =
    tone === "green" ? "fill-emerald-500/10 stroke-emerald-400/40" :
    tone === "blue"  ? "fill-blue-500/10 stroke-blue-400/40" :
    tone === "gray"  ? "fill-white/5 stroke-white/20" :
                       "fill-white/10 stroke-white/30";

  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="12" className={toneClass} strokeWidth="1.5" />
      <text fill="currentColor" x={x + w / 2} y={y + 26} textAnchor="middle" className="text-white" style={{ fontSize: 12, fontWeight: 600 }}>
        {label}
      </text>
      {sub && (
        <text fill="currentColor" x={x + w / 2} y={y + h - 12} textAnchor="middle" className="text-white/70" style={{ fontSize: 11 }}>
          {sub}
        </text>
      )}
    </>
  );
}

function SmallPill({ x, y, label }: { x: number; y: number; label: string }) {
  const w = Math.max(80, label.length * 7.2);
  return (
    <>
      <rect x={x} y={y} width={w} height={22} rx="11" className="fill-white/5 stroke-white/15" strokeWidth="1" />
      <text fill="currentColor" x={x + w / 2} y={y + 14} textAnchor="middle" className="text-white/80" style={{ fontSize: 11 }}>
        {label}
      </text>
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

function Legend({
  items, x, y,
}: { items: { label: string; swatch: string }[]; x: number; y: number }) {
  const gap = 120;
  return (
    <g>
      {items.map((it, i) => (
        <g key={it.label} transform={`translate(${x + i * gap}, ${y - 10})`}>
          <rect width="16" height="6" rx="3" fill={it.swatch} />
          <text fill="currentColor" x="22" y="6" className="text-white/80" style={{ fontSize: 11 }}>
            {it.label}
          </text>
        </g>
      ))}
    </g>
  );
}
