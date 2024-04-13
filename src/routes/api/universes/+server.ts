import { json, error } from '@sveltejs/kit';
import {database} from "../../../lib/database/db";
import {getProfileFromSession} from "../../../lib/helpers/getProfileFromSession";

// POST /api/universes/
// Create a new universe
export async function POST({ request }: { request: Request }) {
    const {name, session} = await request.json();

    const profile = await getProfileFromSession(session);
    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const createdUniverse = await database.universes.create({name, owners: profile.id});
    return json({universe: createdUniverse[0]});
}
