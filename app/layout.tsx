import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://kirylmiadzvedzeu.com";
const TITLE = "Kiryl Miadzvedzeu — Senior Java Backend & Cloud Platform Engineer";
const DESCRIPTION =
  "Senior Java backend engineer in Warsaw, 6+ years, 2+ years in the insurance domain (insurance aggregator, automotive/property insurance): microservices and event-driven systems on AWS, Kubernetes platform (EKS, Terraform, Helm, FluxCD), performance, disaster recovery, on-call, and AI-assisted delivery with Claude Code + MCP.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/avatar.jpg", alt: "Kiryl Miadzvedzeu" }],
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: ["/avatar.jpg"] },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kiryl Miadzvedzeu",
  jobTitle: "Senior Java Backend & Cloud Platform Engineer",
  url: SITE_URL,
  image: `${SITE_URL}/avatar.jpg`,
  email: "mailto:k30medvedev@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
  sameAs: ["https://www.linkedin.com/in/kiryl-miadzvedzeu", "https://github.com/k30medvedev"],
  knowsAbout: ["Java", "Spring Boot", "AWS", "Kubernetes", "Terraform", "Kafka", "Event-driven architecture", "Microservices"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${fraunces.variable}`}>
      <body className="bg-stone-50 text-neutral-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
