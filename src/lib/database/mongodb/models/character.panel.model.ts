"use server";

import {ObjectId} from "mongodb";

export interface CharacterPanel {
    _id: ObjectId;
    owner: ObjectId;
}

export interface NewCharacterPanel {
    owner: ObjectId;
}

/**
 * Create a new character panel
 * @param owner The ID of the owner
 * @returns The new character panel
 */
export function newCharacterPanel(owner: string): NewCharacterPanel {
    return {owner: new ObjectId(owner)};
}

/**
 * Convert a character panel from the database to a character panel
 * @param characterPanel The character panel from the database
 * @returns The character panel
 */
export function convertCharacterPanel(characterPanel: any): CharacterPanel {
    return {
        _id: characterPanel._id,
        owner: characterPanel.owner
    };
}