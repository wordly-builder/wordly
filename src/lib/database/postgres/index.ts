import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_URL } from "$env/static/private"
import { migrate } from 'drizzle-orm/mysql2/migrator';

const client = postgres(DATABASE_URL);

export const db = drizzle(client);

async function migrateDatabase() {
    const connection = client;
// @ts-ignore
    await migrate(db, {migrationsFolder: '.drizzle', migrationsSchema: 'wordly'});
}

// update the database
try {
    await migrateDatabase();
} catch (e) {
    console.error(e);
}