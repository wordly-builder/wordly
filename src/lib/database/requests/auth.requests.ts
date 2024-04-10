import {db} from "../index";
import {accounts} from "../schemas/auth";
import {eq} from "drizzle-orm";

export async function getAccountByUserId(userId: string) {
    return db.select().from(accounts).where(eq(accounts.userId, userId))
}
