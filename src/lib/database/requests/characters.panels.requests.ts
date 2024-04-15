import {db} from "../index";
import {charactersPanels, charactersPanelsCharactersRelations} from "../schemas/characters.panels";
import {eq} from "drizzle-orm";
import {deleteCharactersByPanel} from "./characters.requests";
import {deleteCharactersTemplatesByPanel} from "./characters.templates.requets";

export async function getAllCharactersPanels() {
    return db.select().from(charactersPanels);
}

export async function getCharactersPanelById(id: number) {
    return db.select().from(charactersPanels).where(eq(charactersPanels.id, id))
}

export async function createCharactersPanel() {
    return db.insert(charactersPanels).values({}).returning();
}

export async function deleteCharactersPanel(id: number) {
    // delete all characters
    await deleteCharactersByPanel(id);
    // delete all templates
    await deleteCharactersTemplatesByPanel(id);

    return db.delete(charactersPanels).where(eq(charactersPanels.id, id))
}
