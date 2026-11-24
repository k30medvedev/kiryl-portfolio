export default function PlatformNotes() {
  return (
    <section
      id="platform-notes"
      className="scroll-mt-40 md:scroll-mt-32 mx-auto max-w-6xl px-6 py-16 anchor-target"
    >
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
        Insurance Aggregator Platform — Security, Performance &amp; Reliability
      </h2>
      <p className="text-sm text-neutral-500 mb-4">Jul 2025 – present · via Godel Technologies · client under NDA</p>

      <p className="text-neutral-700 max-w-3xl">
        <strong>Project.</strong> A high-load insurance comparison platform: customers compare
        offers from multiple insurers in one place. The platform is integrated with UK insurers, an
        insurance broker and a major price comparison website; I took part in integrating and
        modernizing these partner integrations. Several product teams build and run their
        services on a shared Kubernetes platform on AWS (EKS), backed by MySQL and DynamoDB, with
        Kafka and RabbitMQ between services. My work splits roughly evenly between backend services
        in Java and Groovy and keeping the platform itself secure, fast and recoverable.
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <h3 className="text-lg font-semibold">What this means for an insurance business</h3>
        <ul className="mt-3 grid md:grid-cols-2 gap-x-8 gap-y-2 text-neutral-700">
          <li>• <span className="font-semibold">Partner integrations</span> with UK insurers, a broker and a price comparison website — integrated and modernized, not just maintained.</li>
          <li>• <span className="font-semibold">Customer-facing endpoints</span> are security-tested automatically on every release (DAST), not when someone remembers to.</li>
          <li>• <span className="font-semibold">Busiest services</span> are load-tested and optimized — up to 30% faster after fixing N+1 queries, timeouts and caching.</li>
          <li>• <span className="font-semibold">Infrastructure failures</span> don&apos;t take services down: after a disaster recovery exercise, every service is safely disruptable.</li>
          <li>• <span className="font-semibold">Production incidents</span> are traced faster thanks to unified logging, and handled through an on-call rotation.</li>
        </ul>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Key decisions &amp; practices</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• <span className="font-semibold">Automated DAST</span> on every release for public-facing endpoints — security checks used to be manual and easy to skip.</li>
            <li>• <span className="font-semibold">Load &amp; performance testing</span> (Gatling) on the heaviest services, then optimization: removed timeouts, fixed N+1 queries, tuned caches, reduced pod load — individual services up to <strong>30% faster</strong>.</li>
            <li>• <span className="font-semibold">Disaster recovery</span>: ran a DR exercise and, based on its findings, made every service safely disruptable.</li>
            <li>• <span className="font-semibold">Service-to-service auth</span>: integrated M2M tokens between internal services.</li>
            <li>• <span className="font-semibold">Unified logging</span> across the platform, replacing a mix of formats that made cross-service tracing slow.</li>
            <li>• <span className="font-semibold">Legacy hardening</span>: untangling tightly coupled older code so it's safer to change without breaking what already works.</li>
            <li>• <span className="font-semibold">Secrets management</span>: moved secrets out of static config into a proper secrets store.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Platform operations</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• Kubernetes workloads across environments via Helm and FluxCD.</li>
            <li>• Terraform for the AWS setup: IAM roles, OIDC, and supporting resources.</li>
            <li>• GitLab CI pipelines for build, test, and deployment.</li>
            <li>• On-call rotation: responding to and resolving production incidents (incident.io, Datadog).</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
        <h3 className="text-lg font-semibold">AI-assisted delivery</h3>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          The whole project runs on Claude with MCP connectors to GitLab, Confluence, Slack and other
          tools. I own the design and the task specification; Claude Code implements it, guided by
          skills and CLAUDE.md / project context. Nothing merges without passing the gates below.
        </p>
        <ol className="mt-4 grid sm:grid-cols-4 gap-3 text-sm">
          <li className="rounded-xl border border-neutral-200 bg-white p-3"><span className="font-semibold">1 · Spec</span><br />Design, task requirements, skills &amp; CLAUDE.md</li>
          <li className="rounded-xl border border-neutral-200 bg-white p-3"><span className="font-semibold">2 · Integration tests</span><br />Every MR, in a dedicated environment</li>
          <li className="rounded-xl border border-neutral-200 bg-white p-3"><span className="font-semibold">3 · AI review</span><br />GitLab Duo + Claude Code</li>
          <li className="rounded-xl border border-neutral-200 bg-white p-3"><span className="font-semibold">4 · Human approval</span><br />Mandatory before merge</li>
        </ol>
        <p className="mt-4 text-sm text-neutral-600">
          Also helping drive the company&apos;s AI-first adoption roadmap, including a focus group
          using Claude in production for analytics.
        </p>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">My role</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• Day-to-day: build new microservices and improve deep legacy code.</li>
            <li>• Set up DAST and performance-testing pipelines, and acted on their findings.</li>
            <li>• Unified logging/observability approach across services.</li>
            <li>• Kubernetes, Terraform, and CI/CD ownership alongside feature work.</li>
            <li>• Onboarding of every new team member; built the project knowledge platform from scratch.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Stack</h3>
          <p className="mt-3 text-neutral-700">
            Java 21, Groovy, Spring Boot, Kafka, RabbitMQ, Kubernetes, Helm, FluxCD, Terraform,
            Docker, GitLab CI, AWS (EKS, IAM, OIDC, IRSA, SQS, SNS, EventBridge, DynamoDB, Lambda),
            MySQL, Liquibase, Gatling, Spock, Testcontainers, Datadog, Micrometer, incident.io.
          </p>
        </div>
      </div>
    </section>
  );
}
