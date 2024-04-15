import {database} from "../../../../../../lib/database/db";
import {error, json} from "@sveltejs/kit";
import {getProfileFromSession} from "../../../../../../lib/helpers/getProfileFromSession";

// UPDATE /api/panels/characters/templates/fields
// Update a character template fields
export async function PUT(req: any) {
    const {id, name, fields} = await req.request.json();
    const session = await req.locals.auth();
    const profile = await getProfileFromSession(session);

    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const template = await database.charactersTemplates.getById(id);
    if (template.length === 0) {
        throw error(404, 'Template not found');
    }

    const universes = await database.universes.getByOwner(profile.id);
    const currentUniverse = universes.find((universe: any) => universe.charactersPanel === template[0].panelId);

    if (!currentUniverse) {
        throw error(403, 'Forbidden');
    }

    // remove fields that are not in the new list
    const oldFields = await database.charactersTemplates.fields.getByTemplate(id);
    for (const field of oldFields) {
        if (!fields.find((f: any) => f.id === field.id)) {
            await database.charactersTemplates.fields.delete(field.id);
        }
    }

    // update all fields
    for (const field of fields) {
        if (field.id === null || field.id === undefined || field.id === -1) {
            const newField = await database.charactersTemplates.fields.create({
                templateId: id,
                name: field.name,
                type: field.type,
                column: field.column,
                row: field.row,
                columnSize: field.columnSize,
                rowSize: field.rowSize
            });
            console.log(newField);
        } else {
            await database.charactersTemplates.fields.update(field.id, {
                templateId: id,
                name: field.name,
                type: field.type,
                column: field.column,
                row: field.row,
                columnSize: field.columnSize,
                rowSize: field.rowSize
            });
        }
    }

    return json(await database.charactersTemplates.fields.getByTemplate(id));
}
