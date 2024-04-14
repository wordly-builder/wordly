import {charactersTemplatesFields} from "../schemas/characters.templates.fields";
import {db} from "../index";
import {eq} from "drizzle-orm";

export async function getAllCharactersTemplatesFields() {
    return db.select().from(charactersTemplatesFields);
}

export async function getCharactersTemplatesFieldById(id: number) {
    return db.select().from(charactersTemplatesFields).where(eq(charactersTemplatesFields.id, id));
}

export async function getCharactersTemplatesFieldsByTemplate(templateId: number) {
    return db.select().from(charactersTemplatesFields).where(eq(charactersTemplatesFields.templateId, templateId));
}

export async function createCharactersTemplatesField({templateId, name, type, columns, rows}: {templateId: number, name: string, type: string, columns: string, rows: string}) {
    return db.insert(charactersTemplatesFields).values({templateId, name, type, columns, rows}).returning();
}

export async function updateCharactersTemplatesField(id: number, {templateId, name, type, columns, rows}: {templateId: number, name: string, type: string, columns: string, rows: string}) {
    return db.update(charactersTemplatesFields).set({templateId, name, type, columns, rows}).where(eq(charactersTemplatesFields.id, id));
}

export async function deleteCharactersTemplatesField(id: number) {
    return db.delete(charactersTemplatesFields).where(eq(charactersTemplatesFields.id, id));
}

export async function deleteCharactersTemplatesFieldsByTemplate(templateId: number) {
    return db.delete(charactersTemplatesFields).where(eq(charactersTemplatesFields.templateId, templateId));
}
