import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
import { FORCE_LOGIN } from "$env/static/private"

// @ts-ignore
async function authorizationHandle({ event, resolve}) {
    const session = FORCE_LOGIN == 'true' ? {} : await event.locals.auth();

    if (!session
        && event.url.pathname.startsWith("/universes")
    ) {
        throw redirect(303, '/');
    }

    if (session
        && (event.url.pathname == "/"
            || event.url.pathname == ""
            || event.url.pathname == undefined
        )
    ) {
        throw redirect(303, '/universes');
    }

    return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle)
