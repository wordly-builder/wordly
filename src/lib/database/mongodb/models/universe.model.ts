"use server";

import type {ObjectId} from "mongodb";

export interface UniversePanels {
    character: ObjectId | null;
    map: ObjectId | null;
}

export interface Universe {
    _id: ObjectId;
    name: string;
    owner: number;
    panels: UniversePanels;
}

export interface NewUniverse {
    name: string;
    owner: number;
    panels: UniversePanels;
}

/**
 *  This function create a new universe
 *
 *  @param name: the name of the universe
 *  @param owner: the user id of the owner of the universe
 *
 *  @return The newly created universe
 */
export function newUniverse(name: string, owner: number): NewUniverse {
    return {
        name,
        owner,
        panels: {
            character: null,
            map: null
        }
    };
}

/**
 * When we get a universe from the database, we need to ensure that the content is in the correct format.
 * This function will add any missing fields.
 *
 * @param universe: the universe object from the database
 *
 * @return The universe object in the correct format
 */
export function convertUniverse(universe: any): Universe {
    const panels = universe.panels || {
        character: null,
        map: null
    };

    return {
        _id: universe._id,
        name: universe.name,
        owner: universe.owner,
        panels: {
            character: panels.character || null,
            map: panels.map || null
        }
    };
}