import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiryl Miadzvedzeu — Portfolio",
  description: "Senior Java / AWS Software Engineer — Event-driven systems, Step Functions, DynamoDB, Terraform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${fraunces.variable}`}>
      <body className="bg-stone-50 text-neutral-900 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
