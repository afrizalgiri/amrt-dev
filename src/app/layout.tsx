import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMRT.dev | Digital Agency Indonesia",
  description:
    "AMRT.dev adalah agensi digital Indonesia yang menghadirkan solusi teknologi premium: Web Development, Mobile App, UI/UX Design, dan Digital Strategy untuk bisnis Anda.",
  keywords: [
    "digital agency indonesia",
    "web development indonesia",
    "jasa pembuatan website",
    "mobile app development",
    "UI UX design",
    "AMRT.dev",
    "agensi digital",
    "jasa website profesional",
  ],
  authors: [{ name: "AMRT.dev" }],
  creator: "AMRT.dev",
  metadataBase: new URL("https://amertadev.my.id"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://amertadev.my.id",
    siteName: "AMRT.dev",
    title: "AMRT.dev | Digital Agency Indonesia",
    description:
      "Agensi digital Indonesia: Web Development, Mobile App, UI/UX Design, dan Digital Strategy.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AMRT.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMRT.dev | Digital Agency Indonesia",
    description: "Agensi digital Indonesia: Web Development, Mobile App, UI/UX Design.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "nwOISSbPkDPEcQFojQismwtE32fLv-UuN9X2UxQRnK8",
  },
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
