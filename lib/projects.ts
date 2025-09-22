import Projects from "@/components/Projects";

export type Project = {
  title: string;
  period: string;
  summary: string;
  stack: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Automotive Group — Calendar Management System",
    period: "2021–2022",
    summary:
      "Internal Google-style calendar for an automotive group: schedule and manage events with filters, tags, and priorities; speaker profiles with photo + talk details; multi-user views for departments.",
    stack: [
      "Java 11",
      "Spring",
      "Hibernate",
      "Gradle",
      "MS SQL",
      "Flyway",
      "RabbitMQ",
      "Docker",
      "GitLab CI",
      "Testcontainers",
      "JUnit",
      "Mockito",
      "Swagger/OpenAPI",
    ],
	 links: [{ label: "Case", href: "#calendar-case" }],
  },

  {
    title: "SolbegSoft / Helmes — Risk & Asset Protection",
    period: "2021–2022",
    summary:
      "Protection software for automotive & property insurance. Migrated parts of a legacy monolith to microservices; delivered new features, QA hardening, and stability improvements.",
    stack: [
      "Java 8",
      "Spring",
      "EclipseLink ORM",
      "Maven",
      "Liquibase",
      "SOAP",
      "XML (SAXIF)",
      "Tomcat",
      "ActiveMQ",
      "Ruleset",
      "JUnit",
      "Mockito",
    ],
	links: [{ label: "Case", href: "#risk-asset" }],
  },

  {
    title: "Shell Energy — Smart Metering Platform",
    period: "2022–2024",
    summary:
      "Real-time metering for 2,200,000+ users. XML-only legacy monolith wrapped by adapters; traffic strangled to WebFlux microservices on Kubernetes. Observability via Prometheus/Grafana with RPS and hourly/daily/weekly ingestion metrics.",
    stack: [
      "Java 17",
      "Spring WebFlux",
      "Spring Boot",
      "RabbitMQ",
      "PostgreSQL",
      "Cassandra",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "Liquibase",
      "Testcontainers",
      "JUnit",
      "Mockito",
      "Cucumber",
      "REST",
      "XML",
      "Maven",
      "Git",
    ],
     links: [{ label: "Case", href: "#shell-energy" }],
  },

  {
    title: "Control-Plane: Event-driven tenant workflows",
    period: "2024–2025",
    summary:
    "Internal multi-tenant control-plane for a SaaS platform: orchestrates full tenant lifecycle (onboarding, configuration, offboarding) using AWS Step Functions + Lambda. Implemented saga patterns with compensations, idempotency, fan-out/fan-in, and async SQS jobs. Built observability with CloudWatch/X-Ray and fault-tolerant retries. Achieved −25% Lambda cost and −30% p95 latency through provisioned concurrency, batching, and payload optimizations.",
    stack: [
      "Java 21",
      "Spring Boot",
      "AWS Lambda",
      "Step Functions",
      "EventBridge",
      "DynamoDB",
      "SQS",
      "Terraform",
      "X-Ray",
    ],
      links: [{ label: "Case", href: "#control-plane-notes" }],
  },
];
