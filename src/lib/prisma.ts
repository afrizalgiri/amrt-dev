import { PrismaClient } from "@prisma/client";

function createPrismaClient() {
  // Production: gunakan Turso (libsql)
  if (process.env.TURSO_DATABASE_URL) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaLibSql } = require("@prisma/adapter-libsql");
    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
  }
  // Local dev: gunakan SQLite file biasa
  return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
