import type { Config } from "drizzle-kit";
import { SUPABASE_URL, SUPABASE_SECRET } from "$env/static/private"
import "dotenv/config";

export default {
    schema: "db/schema",
    out: "db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: SUPABASE_URL || "",
    },
} satisfies Config;
