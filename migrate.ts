import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
// @ts-ignore
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL, { prepare: false, ssl: { rejectUnauthorized: false } });

export const db = drizzle(client);
export const connection = client;


// @ts-ignore
await migrate(db, { migrationsFolder: '.drizzle', migrationsSchema: 'drizzle' });
// @ts-ignore
await connection.end();
