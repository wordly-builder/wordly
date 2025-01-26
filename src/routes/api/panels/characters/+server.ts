import {getProfileFromSession} from "../../../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../../../lib/database/mongodb/db";
import {error, json} from "@sveltejs/kit";

export async function POST({ request }: any) {
    const {universeId, session} = await request.json();
    const user = request.locals.user;
    const universe = await mongodb.universe.getById(universeId);

    console.log('user', user);
    if (!user) {
        throw error(401, 'Unauthorized');
    }

    if (universe === null) {
        throw error(404, 'Universe not found');
    }

    if (universe.owner !== user.id) {
        throw error(401, 'Unauthorized');
    }

    const charactersPanel = await mongodb.charactersPanel.getByOwner(universeId);
    if (charactersPanel.length > 0) {
        throw error(400, 'Characters panel already exists');
    }

    const createdPanel = await mongodb.charactersPanel.create(universeId);

    if (!createdPanel) {
        throw error(500, 'Failed to create panel');
    }

    return json({panel: createdPanel});
}
