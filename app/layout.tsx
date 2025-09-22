import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiryl Miadzvedzeu — Portfolio",
  description: "Senior Java / AWS Software Engineer — Event-driven systems, Step Functions, DynamoDB, Terraform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-neutral-950 text-neutral-50 antialiased">{children}</body>
    </html>
  );
}
