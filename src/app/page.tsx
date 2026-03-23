import Hero from "@/components/public/Hero";
import Services from "@/components/public/Services";
import PortfolioGrid from "@/components/public/PortfolioGrid";
import CtaWhatsapp from "@/components/public/CtaWhatsapp";
import Navbar from "@/components/public/Navbar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSiteConfig() {
  let config = await prisma.siteConfig.findFirst();
  if (!config) {
    config = await prisma.siteConfig.create({
      data: {
        siteName: "AMRT.dev",
        heroTitle: "We Build Digital Experiences",
        heroSubtitle:
          "Agensi digital yang menghadirkan solusi teknologi premium untuk bisnis Anda.",
        whatsappNumber: "6281234567890",
        servicesJson: JSON.stringify([
          {
            title: "Web Development",
            description:
              "Membangun website modern dan responsif dengan teknologi terkini.",
            icon: "Globe",
          },
          {
            title: "Mobile App",
            description:
              "Aplikasi mobile cross-platform yang cepat dan intuitif.",
            icon: "Smartphone",
          },
          {
            title: "UI/UX Design",
            description:
              "Desain antarmuka yang elegan dan berorientasi pada pengalaman pengguna.",
            icon: "Palette",
          },
          {
            title: "Digital Strategy",
            description:
              "Strategi digital komprehensif untuk pertumbuhan bisnis Anda.",
            icon: "TrendingUp",
          },
        ]),
      },
    });
  }
  return config;
}

async function getPortfolios() {
  return prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export default async function Home() {
  const [config, portfolios] = await Promise.all([
    getSiteConfig(),
    getPortfolios(),
  ]);

  const services = JSON.parse(config.servicesJson);

  return (
    <main>
      <Navbar siteName={config.siteName} logoUrl={config.logoUrl} />
      <Hero
        title={config.heroTitle}
        subtitle={config.heroSubtitle}
        siteName={config.siteName}
      />
      <Services services={services} />
      <PortfolioGrid items={portfolios} />
      <CtaWhatsapp
        whatsappNumber={config.whatsappNumber}
        siteName={config.siteName}
      />
    </main>
  );
}
