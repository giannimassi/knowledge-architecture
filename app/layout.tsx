import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knowledge Architecture",
  description: "Your agent doesn't need memory. It needs a knowledge architecture.",
  openGraph: {
    title: "Knowledge Architecture",
    description: "A public map of agent memory, knowledge systems, benchmarks, and governance.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
