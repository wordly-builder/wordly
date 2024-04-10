import {db} from "../index";
import {universes} from "../schemas/universes";
import {eq} from "drizzle-orm";

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
    return db.insert(universes).values({name, owners })
}

export async function updateUniverse(id: number, {name, owners}: {name: string, owners: number }) {
    return db.update(universes).set({name, owners}).where(eq(universes.id, id))
}

export async function deleteUniverse(id: number) {
    return db.delete(universes).where(eq(universes.id, id))
}
