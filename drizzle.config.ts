import type { Config } from "drizzle-kit";
import 'dotenv/config';

export default {
    schema: "./src/lib/database/schemas",
    out: ".drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.SUPABASE_URL || "",
    },
} satisfies Config;
