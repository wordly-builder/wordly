import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth();
    console.log('session', session);

    return {};
};
