import type { Config } from "drizzle-kit";
import 'dotenv/config';

export default {
    schema: "./src/lib/database/schemas",
    out: "./src/lib/database/migration",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.SUPABASE_URL || "",
    },
} satisfies Config;
