import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
import { FORCE_LOGIN } from "$env/static/private"

// @ts-ignore
async function authorizationHandle({ event, resolve}) {

    const session = FORCE_LOGIN == 'true' ? {
        user: {
            name: 'Pebloop',
            email: 'kabondev@gmail.com',
            image: 'https://lh3.googleusercontent.com/a/ACg8ocL54sG1icp9u4dmVGB4d79k3jC-yLVUKwGls1AOnlZNig5EIy0s=s96-c'
        },
        expires: '2050-05-09T10:11:43.666Z'
    } : await event.locals.auth();

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
