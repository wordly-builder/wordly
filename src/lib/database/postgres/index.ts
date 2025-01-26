import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from '$env/dynamic/private';
import {migrate} from "drizzle-orm/postgres-js/migrator";

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client);

export async function migrateDatabase() {
// @ts-ignore
    try {
        migrate(db, {migrationsFolder: '.drizzle', migrationsSchema: 'wordly'}).then(r => console.log(r));
    } catch (e) {
        console.error(e);
    }
}