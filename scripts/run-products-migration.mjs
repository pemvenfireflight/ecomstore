import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const migrationPath = path.join(process.cwd(), "supabase/migrations/20260414_create_products.sql");

async function run() {
  const dbUrl = process.env.SUPABASE_DB_URL;

  if (!dbUrl || dbUrl.includes("your_") || dbUrl.includes("placeholder")) {
    throw new Error(
      "SUPABASE_DB_URL is missing. Set a real Postgres connection string for your Supabase database, then rerun this script.",
    );
  }

  const sqlText = await fs.readFile(migrationPath, "utf8");
  const sql = postgres(dbUrl, { ssl: "require" });

  try {
    await sql.unsafe(sqlText);
    console.log("Products migration applied successfully.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

run().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
