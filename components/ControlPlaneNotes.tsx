export default function ControlPlaneNotes() {
  return (
    <section
      id="control-plane-notes"
      className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 anchor-target"
    >
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
        Notes — Control-Plane (Step Functions + Lambda)
      </h2>

      <p className="text-neutral-700 max-w-3xl">
        <strong>Project.</strong> Multi-tenant control-plane to orchestrate tenant lifecycle
        (onboarding, changes, offboarding) with <strong>AWS Step Functions</strong> for orchestration,{" "}
        <strong>Lambda</strong> for compute, <strong>EventBridge</strong> for scheduling/triggers, and{" "}
        <strong>SQS (+DLQ)</strong> for decoupling. Strong idempotency (“exactly-once perception”),
        retries with jitter/backoff, compensations for saga steps, and end-to-end observability.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Key decisions &amp; patterns</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• <span className="font-semibold">Saga orchestration</span> (retries with jitter/backoff, timeouts, circuit-breakers).</li>
            <li>• <span className="font-semibold">Idempotency</span>: request keys + DynamoDB conditional writes → exactly-once perception.</li>
            <li>• <span className="font-semibold">Fan-out/fan-in</span> via Parallel; async jobs in <span className="font-semibold">SQS</span> (work/retry/DLQ) + outbox.</li>
            <li>• <span className="font-semibold">Observability</span>: structured logs, RED/USE, X-Ray, canaries; SLO/SLI dashboards.</li>
            <li>• <span className="font-semibold">Testing</span>: contract tests, local Step Functions, Testcontainers, fault injection.</li>
            <li>• <span className="font-semibold">Hardening</span>: exponential backoff + jitter, poison-pill quarantine, dedupe, DLQ alarms.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Impact</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• Provisioned Concurrency cut cold starts to near zero during business hours.</li>
            <li>• ~<strong>−30% p95</strong> per orchestration step via batching, payload slimming, fewer network hops.</li>
            <li>• SLO: p95 ≤ 300 ms, tracked via CloudWatch dashboards and alarms.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">My role</h3>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• Designed state machines, compensations, and idempotency strategies.</li>
            <li>• Implemented Lambda handlers, SQS consumers, and inter-service contracts.</li>
            <li>• Performance/cost tuning (Provisioned Concurrency, batching, memory tuning).</li>
            <li>• Dashboards/alerts and on-call runbooks; cutovers and post-mortems.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Stack</h3>
          <p className="mt-3 text-neutral-700">
            AWS Step Functions, Lambda (Java), EventBridge, SQS, DynamoDB, API Gateway, Terraform,
            CloudWatch/X-Ray, GitHub Actions; Testcontainers, JUnit/Mockito, contract tests.
          </p>
        </div>
      </div>
    </section>
  );
}
