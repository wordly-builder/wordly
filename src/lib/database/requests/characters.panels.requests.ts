import {db} from "../index";
import {charactersPanels, charactersPanelsCharactersRelations} from "../schemas/characters.panels";
import {eq} from "drizzle-orm";

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
    return db.delete(charactersPanels).where(eq(charactersPanels.id, id))
}
