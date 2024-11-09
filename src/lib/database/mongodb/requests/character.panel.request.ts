"use server";

import {connectToCluster, getCharactersPanelsCollection, getUniversesCollection} from "../utils";
import {ObjectId} from "mongodb";
import {convertCharacterPanel, type NewCharacterPanel} from "../models/character.panel.model";
import type {CharacterPanel} from "../models/character.panel.model";

/**
 * Get all characters panels
 *
 * @returns {Promise<CharacterPanel[]>} A promise that contains all characters panels
 */
export async function getCharactersPanels(): Promise<CharacterPanel[]> {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersCollection = await getCharactersPanelsCollection(client);
    const characters = await charactersCollection.find().toArray();
    const updatedCharacters = characters.map((character) => {return convertCharacterPanel(character)});

    await client.close();

    return updatedCharacters;
}

/**
 * Get a character panel by its ID
 *
 * @param {string} id The ID of the character panel
 * @returns {Promise<CharacterPanel>} A promise that contains the character panel or null if it doesn't exist
 */
export async function getCharactersPanelById(id: string): Promise<CharacterPanel | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersPanelsCollection(client);
    const _id = new ObjectId(id);
    const charactersPanel = await charactersCollection.findOne({_id});
    const updatedCharactersPanel = charactersPanel ? convertCharacterPanel(charactersPanel) : null;

    await client.close();

    return updatedCharactersPanel;
}

/**
 * Get all characters panels by their owner
 *
 * @param {string} owner The ID of the owner
 * @returns {Promise<CharacterPanel[]>} A promise that contains all characters panels
 */
export async function getCharactersPanelsByOwner(owner: string): Promise<CharacterPanel[]> {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersCollection = await getCharactersPanelsCollection(client);
    const characters = await charactersCollection.find({owner: new ObjectId(owner)}).toArray();
    const updatedCharacters = characters.map((character) => {return convertCharacterPanel(character)});

    await client.close();

    return updatedCharacters;
}

/**
 * Create a new characters panel
 *
 * @param {number} owner The ID of the owner
 * @returns {Promise<CharacterPanel>} A promise that contains the newly created characters panel
 */
export async function createCharactersPanel(owner: string): Promise<CharacterPanel | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const newCharactersPanel: NewCharacterPanel = {
        owner: new ObjectId(owner)
    }

    const charactersCollection = await getCharactersPanelsCollection(client);
    const createResponse = await charactersCollection.insertOne(newCharactersPanel);

    await client.close();

    const updatedCharactersPanel = {
        ...newCharactersPanel,
        _id: createResponse.insertedId
    }

    return updatedCharactersPanel;
}

/**
 * Delete a characters panel by its ID
 *
 * @param {string} id The ID of the characters panel
 * @returns {Promise<boolean>} A promise that contains true if the characters panel was deleted, false otherwise
 */
export async function deleteCharactersPanel(id: string) : Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const charactersCollection = await getCharactersPanelsCollection(client);
    const _id = new ObjectId(id);
    const deleteResponse = await charactersCollection.deleteOne({_id});

    await client.close();

    return deleteResponse.deletedCount > 0;
}

/**
 * Update a characters panel by its ID
 *
 * @param {string} id The ID of the characters panel
 * @param {string} name The new name of the characters panel
 * @returns {Promise<boolean>} A promise that contains true if the characters panel was updated, false otherwise
 */
export async function updateCharactersPanel(id: string, owner: string): Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const charactersCollection = await getCharactersPanelsCollection(client);
    const _id = new ObjectId(id);
    const updateResponse = await charactersCollection.updateOne({_id}, {$set: {owner}});

    await client.close();

    return updateResponse.modifiedCount > 0;
}
