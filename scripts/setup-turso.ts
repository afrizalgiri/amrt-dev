/**
 * Script untuk setup/migrate database Turso di production.
 * Jalankan: npx tsx scripts/setup-turso.ts
 *
 * Requires env: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
 */
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const migrations = [
  `CREATE TABLE IF NOT EXISTS "Admin" (
    "id"           TEXT NOT NULL PRIMARY KEY,
    "username"     TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "createdAt"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "SiteConfig" (
    "id"             TEXT NOT NULL PRIMARY KEY,
    "siteName"       TEXT NOT NULL DEFAULT 'AMRT.dev',
    "logoUrl"        TEXT NOT NULL DEFAULT '',
    "heroTitle"      TEXT NOT NULL DEFAULT 'We Build Digital Experiences',
    "heroSubtitle"   TEXT NOT NULL DEFAULT 'Agensi digital yang menghadirkan solusi teknologi premium untuk bisnis Anda.',
    "whatsappNumber" TEXT NOT NULL DEFAULT '6281234567890',
    "servicesJson"   TEXT NOT NULL DEFAULT '[]'
  )`,
  `CREATE TABLE IF NOT EXISTS "Portfolio" (
    "id"          TEXT NOT NULL PRIMARY KEY,
    "title"       TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl"    TEXT NOT NULL,
    "category"    TEXT NOT NULL,
    "techStack"   TEXT NOT NULL DEFAULT '',
    "liveUrl"     TEXT NOT NULL DEFAULT '',
    "order"       INTEGER NOT NULL DEFAULT 0,
    "published"   INTEGER NOT NULL DEFAULT 1,
    "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   DATETIME NOT NULL
  )`,
];

async function main() {
  console.log("Connecting to Turso:", process.env.TURSO_DATABASE_URL);

  for (const sql of migrations) {
    await client.execute(sql);
    console.log("✓", sql.split("\n")[0].trim());
  }

  console.log("\nDatabase setup complete!");
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
