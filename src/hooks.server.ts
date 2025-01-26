import type { Handle } from "@sveltejs/kit";
import {deleteSessionTokenCookie, setSessionTokenCookie} from "./lib/database/cookies";
import {validateSessionToken} from "./lib/database/postgres/requests/auth.requests";
import {postgres} from "./lib/database/postgres/db";
import {redirect} from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("token") ?? null;
    if (token === null) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    // check db is up
    let dbUp = false;
    while (!dbUp) {
        try {
            await postgres.user.get(0);
            dbUp = true;
        } catch (e) {
            console.error(e);
        }
    }

        const {session, user} = await validateSessionToken(token);
        if (session !== null) {
            setSessionTokenCookie(event, token, session.expiresAt);
        } else {
            deleteSessionTokenCookie(event);
        }

        event.locals.session = session;
        event.locals.user = user;

        console.log(event.url.pathname);
        if ((session === null || user === null)
            && event.url.pathname !== undefined
            && event.url.pathname !== "/"
            && !event.url.pathname.startsWith("/login")
        ) {
            throw redirect(303, "/login");
        } else if (session !== null && user !== null
            && (event.url.pathname === undefined
                || event.url.pathname === "/"
                || event.url.pathname.startsWith("/login"))
        ) {
            throw redirect(303, "/universes");
        }
    return resolve(event);
};

try {
    await postgres.migrate();
} catch (e) {
    console.error(e);

}