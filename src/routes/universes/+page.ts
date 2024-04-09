export async function load() {
    const session = await event.locals.auth();
    return {
        session: session,
    };
}
