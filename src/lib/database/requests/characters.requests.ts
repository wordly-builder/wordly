import {db} from "../index";
import {eq} from "drizzle-orm";
import {characters} from "../schemas/characters";

export async function getAllCharacters() {
    return db.select().from(characters);
}

export async function getCharacterById(id: number) {
    return db.select().from(characters).where(eq(characters.id, id))
}

export async function getCharactersByPanel(panelId: number) {
    return db.select().from(characters).where(eq(characters.panelId, panelId))
}

export async function createCharacter({name, panelId}: {name: string, panelId: number }) {
    return db.insert(characters).values({name, panelId }).returning();
}

export async function updateCharacter(id: number, {name, panelId}: {name: string, panelId: number }) {
    return db.update(characters).set({name, panelId}).where(eq(characters.id, id))
}

export async function deleteCharacter(id: number) {
    return db.delete(characters).where(eq(characters.id, id))
}
