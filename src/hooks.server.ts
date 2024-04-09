import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

// @ts-ignore
async function authorizationHandle({ event, resolve}) {
    const session = await event.locals.auth();
    if (!session
        && event.url.pathname.startsWith("/projects")
    ) {
        throw redirect(303, '/');
    }

    console.log(event.url.pathname);
    if (session
        && (event.url.pathname == "/"
            || event.url.pathname == ""
            || event.url.pathname == undefined
        )
    ) {
        throw redirect(303, '/projects');
    }

    return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle)
