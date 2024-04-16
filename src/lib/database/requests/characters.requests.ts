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

export async function createCharacter({panelId}: {panelId: number }) {
    return db.insert(characters).values({panelId }).returning();
}

export async function updateCharacter(id: number, {panelId}: {panelId: number }) {
    return db.update(characters).set({panelId}).where(eq(characters.id, id))
}

export async function deleteCharacter(id: number) {
    return db.delete(characters).where(eq(characters.id, id))
}

export async function deleteCharactersByPanel(panelId: number) {
    return db.delete(characters).where(eq(characters.panelId, panelId))
}
