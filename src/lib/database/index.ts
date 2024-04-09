import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { DATABASE_URL } from "$env/static/private"

const client = postgres(DATABASE_URL, { prepare: false, ssl: { rejectUnauthorized: false } });

export const db = drizzle(client);

await migrate(db, { migrationsFolder: "src/lib/database/migration/" });

