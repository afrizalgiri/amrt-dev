import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMRT.dev | Digital Agency",
  description:
    "Agensi digital yang menghadirkan solusi teknologi premium untuk bisnis Anda. Web Development, Mobile App, UI/UX Design.",
  keywords: ["digital agency", "web development", "AMRT.dev", "portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased">
      <body className="bg-surface-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
