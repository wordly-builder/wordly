"use server";

import {postgres} from "../database/postgres/db";
import type {User} from "../database/postgres/schemas/auth";

export async function getProfileFromSession(session: any) : Promise<User | null> {

    console.log(session);
    if (!session || !session.userId) {
        return null;
    }
    return await postgres.user.get(session.userId);
}
