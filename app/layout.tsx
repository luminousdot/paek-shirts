import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paek Shirts — Niš Climbing Club",
  description: "Poruči svoju penjačku majicu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
