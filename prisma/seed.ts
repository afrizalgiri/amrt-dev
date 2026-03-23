import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

function createClient() {
  if (process.env.TURSO_DATABASE_URL) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaLibSql } = require("@prisma/adapter-libsql");
    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
  }
  return new PrismaClient();
}

const prisma = createClient();

async function main() {
  // Create default admin
  const passwordHash = await bcrypt.hash("admin123", 12);

  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: "admin",
        passwordHash,
      },
    });
  }

  // Create default site config
  const existingConfig = await prisma.siteConfig.findFirst();
  if (!existingConfig) {
    await prisma.siteConfig.create({
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

  // Create sample portfolio items
  const portfolioCount = await prisma.portfolio.count();
  if (portfolioCount === 0) {
    await prisma.portfolio.createMany({
      data: [
        {
          title: "E-Commerce Platform",
          description:
            "Platform e-commerce modern dengan sistem pembayaran terintegrasi dan dashboard admin yang powerful.",
          imageUrl: "/uploads/portfolio-1.jpg",
          category: "Web Development",
          techStack: "Next.js, Tailwind CSS, Prisma, PostgreSQL",
          liveUrl: "",
          order: 1,
          published: true,
        },
        {
          title: "HealthCare Mobile App",
          description:
            "Aplikasi kesehatan mobile dengan fitur tracking, booking dokter, dan rekam medis digital.",
          imageUrl: "/uploads/portfolio-2.jpg",
          category: "Mobile App",
          techStack: "React Native, Node.js, MongoDB",
          liveUrl: "",
          order: 2,
          published: true,
        },
        {
          title: "Corporate Website Redesign",
          description:
            "Redesain website korporat dengan pendekatan user-centered design dan branding yang konsisten.",
          imageUrl: "/uploads/portfolio-3.jpg",
          category: "UI/UX Design",
          techStack: "Figma, Next.js, Framer Motion",
          liveUrl: "",
          order: 3,
          published: true,
        },
        {
          title: "Fintech Dashboard",
          description:
            "Dashboard analitik untuk fintech dengan visualisasi data real-time dan manajemen portofolio.",
          imageUrl: "/uploads/portfolio-4.jpg",
          category: "Web Development",
          techStack: "React, D3.js, FastAPI, PostgreSQL",
          liveUrl: "",
          order: 4,
          published: true,
        },
        {
          title: "Restaurant Booking System",
          description:
            "Sistem reservasi restoran online dengan manajemen meja, menu digital, dan notifikasi real-time.",
          imageUrl: "/uploads/portfolio-5.jpg",
          category: "Web Development",
          techStack: "Next.js, Supabase, Tailwind CSS",
          liveUrl: "",
          order: 5,
          published: true,
        },
        {
          title: "Travel App UI Kit",
          description:
            "Kit desain UI lengkap untuk aplikasi travel dengan 50+ screen dan komponen reusable.",
          imageUrl: "/uploads/portfolio-6.jpg",
          category: "UI/UX Design",
          techStack: "Figma, Illustration",
          liveUrl: "",
          order: 6,
          published: true,
        },
      ],
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
