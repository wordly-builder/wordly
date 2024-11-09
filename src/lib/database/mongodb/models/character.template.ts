import {ObjectId} from "mongodb";

export interface CharacterTemplate {
    _id: ObjectId;
    owner: ObjectId;
    name: string;
    fields: Field[];
}

export interface Field {
    name: string;
    type: string;
    value: string;
    column: number;
    row: number;
    columnSize: number;
    rowSize: number;
    isMain: boolean;
}

export interface NewCharacterTemplate {
    owner: ObjectId;
    name: string;
    fields: Field[];
}

/**
 * Create a new character template
 * @param owner The ID of the owner
 * @param name The name of the template
 * @param fields The fields of the template
 * @returns The new character template
 */
export function newCharacterTemplate(owner: string, name: string, fields: Field[]): NewCharacterTemplate {
    return {owner: new ObjectId(owner), name, fields};
}

/**
 * Convert a character template from the database to a character template
 * @param characterTemplate The character template from the database
 * @returns The character template
 */
export function convertCharacterTemplate(characterTemplate: any): CharacterTemplate {
    let fields: Field[] = [];
    if (characterTemplate.fields) {
        fields = characterTemplate.fields.map((field: any) => convertField(field));
    }

    return {
        _id: characterTemplate._id,
        owner: characterTemplate.owner,
        name: characterTemplate.name || "",
        fields: fields
    };
}

/** Convert a character template field
 *
 * @param field The field of the character template
 * @returns The field
 */
function convertField(field: any): Field {
    return {
        name: field.name || "",
        type: field.type || "text",
        value: field.value || "",
        column: field.column || 1,
        row: field.row || 1,
        columnSize: field.columnSize || 1,
        rowSize: field.rowSize || 1,
        isMain: field.isMain || false
    };
}