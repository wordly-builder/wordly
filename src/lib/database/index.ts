import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { SUPABASE_URL } from "$env/static/private"

const client = postgres(SUPABASE_URL, { onnotice: () => null });

export const db = drizzle(client);

await migrate(db, { migrationsFolder: ".drizzle" });

