"use server";

import {connectToCluster, getUniversesCollection} from "../utils";
import {ObjectId} from "mongodb";
import type {NewUniverse, Universe} from "../models/universe.model";
import {convertUniverse} from "../models/universe.model";
import {getMapPanelsByOwner} from "./map.panel.request";
import {getCharactersPanelsByOwner} from "./character.panel.request";

const panels = [
    {
        name: 'characters',
        isActive: async (universeId: string) => {
            const characters = await getCharactersPanelsByOwner(universeId);
            return characters.length > 0;
        }
    },
    {
        name: 'maps',
        isActive: async (universeId: string) => {
            const maps = await getMapPanelsByOwner(universeId);
            return maps.length > 0;
        }
    }
    ];

/**
 * This function retrieves all the universes from the database
 *
 * @return The list of universes
 */
export async function getUniverses(): Promise<Universe[]> {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const universesCollection = await getUniversesCollection(client);
    const universes = await universesCollection.find().toArray();
    const updatedUniverses = universes.map((universe) => {return convertUniverse(universe)});

    await client.close();

    return updatedUniverses;
}

/**
 * This function retrieves a universe by its id
 *
 * @param id: the id of the universe
 *
 * @return The universe object
 */
export async function getUniverseById(id: string): Promise<Universe | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const universesCollection = await getUniversesCollection(client);
    const _id = new ObjectId(id);
    const universe = await universesCollection.findOne({_id});
    const updatedUniverse = convertUniverse(universe);

    await client.close();

    return updatedUniverse;
}

/**
 * This function retrieves all the universes owned by a user
 *
 * @param owner: the user id of the owner
 *
 * @return The list of universes
 */
export async function getUniversesByOwner(owner: number): Promise<Universe[]> {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const universesCollection = await getUniversesCollection(client);
    const universes = await universesCollection.find({owner}).toArray();
    const updatedUniverses = universes.map((universe) => {return convertUniverse(universe)});

    await client.close();

    return updatedUniverses;
}

/**
 * This function creates a new universe
 *
 * @param name: the name of the universe
 * @param owner: the user id of the owner of the universe
 */
export async function createUniverse(name: string, owner: number): Promise<Universe | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const newUniverse: NewUniverse = {
        name,
        owner,
        panels: {
            character: null,
            map: null
        }
    }

    const universesCollection = await getUniversesCollection(client);
    const newUniverseDocument = await universesCollection.insertOne(newUniverse);

    await client.close();

    const universe: Universe = {
        ...newUniverse,
        _id: newUniverseDocument.insertedId
    }

    return universe;
}

/**
 * This function updates a universe
 *
 * @param id: the id of the universe
 *
 * @return True if the universe was deleted, false otherwise
 */
export async function deleteUniverse(id: string): Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const universesCollection = await getUniversesCollection(client);
    const _id = new ObjectId(id);
    const deleteResponse = await universesCollection.deleteOne({_id});

    await client.close();

    return deleteResponse.deletedCount > 0;
}

/**
 * This function updates a universe
 *
 * @param id: the id of the universe
 * @param name: the new name of the universe
 *
 * @return True if the universe was updated, false otherwise
 */
export async function updateUniverse(id: string, name: string): Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const universesCollection = await getUniversesCollection(client);
    const _id = new ObjectId(id);
    const updateResponse = await universesCollection.updateOne({_id}, {$set: {name}});

    await client.close();

    return updateResponse.modifiedCount > 0;
}

/**
 * This function return all inactivated panels of an universe
 *
 * @param id: the id of the universe
 *
 * @return The list of inactivated panels
 */
export async function getInactivePanels(id: string): Promise<string[]> {
    let inactivePanels = [];
    for (let panel of panels) {
        if (!await panel.isActive(id)) {
            inactivePanels.push(panel);
        }
    }
    return inactivePanels.map((panel) => {
        return panel.name
    });
}

/**
 * This function return all activated panels of an universe
 *
 * @param id: the id of the universe
 *
 * @return The list of activated panels
 */
export async function getActivePanels(id: string): Promise<string[]> {
    let activePanels = [];
    for (let panel of panels) {
        if (await panel.isActive(id)) {
            activePanels.push(panel);
        }
    }

    return activePanels.map((panel) => {
        return panel.name
    });
}