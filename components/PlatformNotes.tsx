export default function PlatformNotes() {
  return (
    <section
      id="platform-notes"
      className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target"
    >
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
        Notes — Platform: Security, Performance &amp; Observability
      </h2>

      <p className="text-neutral-700 max-w-3xl">
        <strong>Project.</strong> A Kubernetes platform on AWS, shared by several product teams in
        the insurance domain. My work splits roughly evenly between building backend services and
        keeping the platform reliable and secure. Over the past year the focus has been on three
        things the team feels directly: the security of our public endpoints, the performance of
        the busiest services, and how fast we can track down a bug in production.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Key decisions &amp; practices</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• <span className="font-semibold">Automated DAST</span> on every release for public-facing endpoints — security checks used to be manual and easy to skip.</li>
            <li>• <span className="font-semibold">Load &amp; performance testing</span> (Gatling) on the heaviest services, used to prioritize which ones move to more scalable approaches.</li>
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
            <li>• Driving the team's AI-first adoption roadmap, including a focus group using Claude in production for analytics.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">My role</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• Day-to-day: build new microservices and improve deep legacy code.</li>
            <li>• Set up DAST and performance-testing pipelines, and acted on their findings.</li>
            <li>• Unified logging/observability approach across services.</li>
            <li>• Kubernetes, Terraform, and CI/CD ownership alongside feature work.</li>
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
