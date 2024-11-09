import {getProfileFromSession} from "../../../../lib/helpers/getProfileFromSession";
import {error, json} from "@sveltejs/kit";
import {postgres} from "../../../../lib/database/postgres/db";

// POST /api/panels/maps/
// Create a new maps panel
export async function POST({ request }: { request: Request }) {
    const {universeId, session} = await request.json();
    const profile = await getProfileFromSession(session);
    const universe = await postgres.universes.getById(universeId);

    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    if (universe.length === 0) {
        throw error(404, 'Universe not found');
    }

    if (universe[0].owners !== profile.id) {
        throw error(401, 'Unauthorized');
    }

    if (universe[0].mapsPanel !== null) {
        throw error(400, 'Maps panel already exists');
    }

    const createdPanel = await postgres.panels.maps.create();

    if (!createdPanel) {
        throw error(500, 'Failed to create panel');
    }

    await postgres.universes.linkMapsPanel(universeId, createdPanel[0].id);

    return json({panel: createdPanel[0]});

}
