import {db} from "../index";
import {universes} from "../schemas/universes";
import {eq} from "drizzle-orm";
import {deleteCharactersPanel} from "./characters.panels.requests";
import {deleteMapsPanel} from "./maps.panels.requests";

export async function getAllUniverses() {
    return db.select().from(universes);
}

export async function getUniverseById(id: number) {
    return db.select().from(universes).where(eq(universes.id, id))
}

export async function getUniversesByOwner(owner: number) {
    return db.select().from(universes).where(eq(universes.owners, owner))
}

export async function createUniverse({name, owners}: {name: string, owners: number }) {
    return db.insert(universes).values({name, owners }).returning();
}

export async function updateUniverse(id: number, {name, owners}: {name: string, owners: number }) {
    return db.update(universes).set({name, owners}).where(eq(universes.id, id))
}

export async function deleteUniverse(id: number) {
    const universe = await getUniverseById(id)
    if (universe.length < 1) {
        return null
    }

    // delete all panels
    await deleteCharactersPanel(universe[0].charactersPanel);
    await deleteMapsPanel(universe[0].mapsPanel);

    return db.delete(universes).where(eq(universes.id, id))
}

export async function linkCharactersPanel(universeId: number, panelId: number) {
    return db.update(universes).set({charactersPanel: panelId}).where(eq(universes.id, universeId))
}

export async function linkMapsPanel(universeId: number, panelId: number) {
    return db.update(universes).set({mapsPanel: panelId}).where(eq(universes.id, universeId))
}
