import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insighta Labs+ - Profile Intelligence Platform",
  description:
    "Natural language profile search, filtering, and analysis for demographic intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
