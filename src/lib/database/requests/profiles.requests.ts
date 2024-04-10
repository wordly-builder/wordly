import {db} from "../index";
import {profiles} from "../schemas/profiles";
import {eq} from "drizzle-orm";

export async function getAllProfiles() {
    return db.select().from(profiles);
}

export async function getProfileById(id: number) {
    return db.select().from(profiles).where(eq(profiles.id, id))
}

export async function getProfileByGoogleId(googleId: string) {
    return db.select().from(profiles).where(eq(profiles.googleId, googleId))
}

export async function createProfile({googleId, name, email, image}: { googleId: string, name: string, email: string, image: string }) {
    return db.insert(profiles).values({ googleId, name, email, image, createdAt: new Date().toISOString() })
}
