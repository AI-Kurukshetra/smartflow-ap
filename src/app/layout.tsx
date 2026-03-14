import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedStack - Telehealth Platform",
  description:
    "MedStack is a professional API-first telehealth platform that unites EHR, scheduling, and secure delivery of care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
