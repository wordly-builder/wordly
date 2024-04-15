import {charactersTemplates} from "../schemas/characters.templates";
import {db} from "../index";
import {eq} from "drizzle-orm";
import {deleteCharactersTemplatesFieldsByTemplate} from "./characters.templates.fields.requests";

export async function getAllCharactersTemplates() {
    return db.select().from(charactersTemplates);
}

export async function getCharactersTemplateById(id: number) {
    return db.select().from(charactersTemplates).where(eq(charactersTemplates.id, id));
}

export async function getCharactersTemplatesByPanel(panelId: number) {
    return db.select().from(charactersTemplates).where(eq(charactersTemplates.panelId, panelId));
}

export async function createCharactersTemplate({panelId, name}: {panelId: number, name: string}) {
    return db.insert(charactersTemplates).values({panelId, name}).returning();
}

export async function updateCharactersTemplate(id: number, {panelId, name}: {panelId: number, name: string}) {
    return db.update(charactersTemplates).set({panelId, name}).where(eq(charactersTemplates.id, id));
}

export async function deleteCharactersTemplate(id: number) {
    // delete fields
    deleteCharactersTemplatesFieldsByTemplate(id);

    return db.delete(charactersTemplates).where(eq(charactersTemplates.id, id));
}

export async function deleteCharactersTemplatesByPanel(panelId: number) {
    const templates = await getCharactersTemplatesByPanel(panelId);
    for (const template of templates) {
        await deleteCharactersTemplatesFieldsByTemplate(template.id);
    }

    return db.delete(charactersTemplates).where(eq(charactersTemplates.panelId, panelId));
}
