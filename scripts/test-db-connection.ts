/**
 * Test MySQL connection using DATABASE_URL from environment.
 * Run on Hostinger after setting env vars: npm run db:test
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function maskDatabaseUrl(url: string | undefined) {
  if (!url) return "(not set)";
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.username}:***@${parsed.hostname}:${parsed.port || "3306"}${parsed.pathname}`;
  } catch {
    return "(invalid DATABASE_URL format)";
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  console.log("DATABASE_URL:", maskDatabaseUrl(databaseUrl));

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    const [categories, products, sections] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.contentSection.count(),
    ]);
    console.log("Connection OK");
    console.log(`Categories: ${categories}`);
    console.log(`Products: ${products}`);
    console.log(`Content sections: ${sections}`);
  } catch (error) {
    console.error("Connection failed:");
    console.error(error instanceof Error ? error.message : error);
    console.error("\nHostinger production should use localhost:");
    console.error(
      'DATABASE_URL="mysql://USER:URL_ENCODED_PASSWORD@localhost:3306/DATABASE"',
    );
    console.error("Encode = as %3D in the password.");
    process.exit(1);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
