import {userTable, type User} from "../schemas/auth";
import {db} from "../index";
import {eq} from "drizzle-orm";

export function verifyUsernameInput(username: string): boolean {
    return username.length > 3 && username.length < 32 && username.trim() === username;
}

export function verifyPasswordInput(password: string): boolean {
    return password.length > 7 && password.length < 256;
}

export function verifyEmailInput(email: string): boolean {
    return email.length > 3 && email.length < 256 && email.includes("@");
}

export function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.subtle.digest("SHA-256", new TextEncoder().encode(password)).then((hash) => {
            resolve(Buffer.from(hash).toString("hex"));
        }).catch(reject);
    });
}

export async function createUserWithEmail(username: string, password: string, email: string): Promise<User> {
    const passwordHash = await hashPassword(password);
    const user = {
            name: username,
            email,
            isEmailVerified: false,
            passwordHash,
            createdAt: new Date(),
            profilePictureUrl: null
        };
    await (await db).insert(userTable).values(user);
    const row = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
    if (row.length < 1) {
        throw new Error("Failed to create user");
    }
    return row[0];
}

export async function createUserWithGithub(username: string, githubId: string): Promise<User> {
    const user = {
            name: username,
            email: "",
            isEmailVerified: false,
            passwordHash: "",
            createdAt: new Date(),
            profilePictureUrl: null,
            githubId
        };
    const row = await db.insert(userTable).values(user);
    if (row.length < 1) {
        throw new Error("Failed to create user");
    }
    return row[0];
}

export async function createUserWithGoogle(username: string, googleId: string): Promise<User> {
    const user = {
            name: username,
            email: "",
            isEmailVerified: false,
            passwordHash: "",
            createdAt: new Date(),
            profilePictureUrl: null,
            googleId
        };
    const row = await db.insert(userTable).values(user);
    if (row.length < 1) {
        throw new Error("Failed to create user");
    }
    return row[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
    return result.length > 0 ? result[0] : null;
}

export async function getUserById(id: number): Promise<User | null> {
    const result = await db.select().from(userTable).where(eq(userTable.id, id)).limit(1)
    return result.length > 0 ? result[0] : null;
}

export async function loginWithEmail(email: string, password: string): Promise<User | null> {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    const passwordHash = await hashPassword(password);
    const passwordValid = passwordHash === user.passwordHash;
    return passwordValid ? user : null;
}



