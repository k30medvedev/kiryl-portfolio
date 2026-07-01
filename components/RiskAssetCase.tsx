export default function RiskAssetCase() {
  return (
    <section id="risk-asset-protection" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
        SolbegSoft / Helmes — Risk & Asset Protection
      </h2>

      <p className="text-neutral-700 max-w-3xl">
        Protection software for automotive &amp; property insurance. We adapted the product for a
        specific region: localization &amp; compliance rules, integrations with regional systems,
        and configuration-driven feature toggles. In parallel, we migrated selected monolith parts
        to microservices and hardened QA/stability.
      </p>

      <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 mb-4">
            Regional adaptation
          </h3>
          <ul className="space-y-2 text-neutral-700">
            <li>• Core product wrapped with a region pack: locale, currency, and compliance rules.</li>
            <li>• Integration adapters for policy/claims/payments, with mapping &amp; validation layers.</li>
            <li>• Feature flags per region; rules engine changes for product/regulatory logic.</li>
            <li>• Fewer production incidents after QA hardening and adapter isolation.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-sm inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 mb-4">
            My Role
          </h3>
          <ul className="space-y-2 text-neutral-700">
            <li>• Adapted out-of-the-box features for a specific region (rules, locales, UX).</li>
            <li>• Built integration adapters (policy/claims), mapping &amp; validation layers.</li>
            <li>• Configuration-driven toggles (feature flags) and rules engine changes.</li>
            <li>• Helped extract modules from the monolith to microservices (contracts, endpoints).</li>
            <li>• Tests: unit/integration, contract tests for adapters.</li>
            <li>• Deployment support and functional scope discussions with BA/Tech Lead.</li>
          </ul>

          <div className="mt-6">
            <a href="#platform-notes" className="text-sm text-emerald-700 hover:text-emerald-600">↑ Back to cases</a>
          </div>
        </div>
      </div>
    </section>
  );
}
