import {ObjectId} from "mongodb";

export interface Character {
    _id: ObjectId;
    owner: ObjectId;
    template: ObjectId;
    fields: CharacterField[];
}

interface CharacterField {
    name: string;
    value: string;
}

export interface NewCharacter {
    owner: ObjectId;
    template: ObjectId;
    fields: CharacterField[];
}

/**
 * Create a new character
 * @param owner The ID of the owner
 * @param template The ID of the template
 * @param fields The fields of the character
 * @returns The new character
 */
export function newCharacter(owner: string, template: string): NewCharacter {
    return {owner: new ObjectId(owner), template: new ObjectId(template), fields: []};
}

/**
 * Convert a character from the database to a character
 * @param character The character from the database
 * @returns The character
 */
export function convertCharacter(character: any): Character {
    let fields: CharacterField[] = [];
    if (character.fields) {
        fields = character.fields.map((field: any) => convertField(field));
    }

    return {
        _id: character._id,
        owner: character.owner,
        template: character.template,
        fields: fields || []
    };

}

/** Convert a character field
 *
 * @param field The field of the character
 * @returns The field
 */
function convertField(field: any): CharacterField {
    return {
        name: field.name || "",
        value: field.value || ""
    };
}