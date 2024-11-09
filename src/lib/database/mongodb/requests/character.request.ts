"use server";

import {connectToCluster, getCharactersCollection} from "../utils";
import {ObjectId} from "mongodb";
import type {Character, NewCharacter} from "../models/character.model";

/**
 * Get all characters
 * @returns All characters
 */
export async function getCharacters(): Promise<Character[]> {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersCollection = await getCharactersCollection(client);
    const characters = await charactersCollection.find().toArray();

    await client.close();

    return characters as Character[];
}

/**
 * Get a character by ID
 * @param id The ID of the character
 * @returns The character
 */
export async function getCharacterById(id: string): Promise<Character | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersCollection(client);
    const _id = new ObjectId(id);
    const character = await charactersCollection.findOne({_id});

    await client.close();

    if (!character) {
        return null;
    }

    return character as Character;
}

/**
 * Get characters by owner
 * @param owner The ID of the owner
 * @returns The characters
 */
export async function getCharactersByOwner(owner: string): Promise<Character[]> {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersCollection = await getCharactersCollection(client);
    const characters = await charactersCollection.find({owner: new ObjectId(owner)}).toArray();

    await client.close();

    return characters as Character[];
}

/**
 * Create a new character
 * @param newCharacter The new character
 * @returns The new character
 */
export async function createCharacter(newCharacter: NewCharacter): Promise<Character | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersCollection(client);
    const character = await charactersCollection.insertOne(newCharacter);

    await client.close();
    return {
        _id: character.insertedId,
        ...newCharacter
    }
}

/** Update a character
 *
 * @param updatedCharacter The updated character
 * @returns Whether the character was updated or not
 */
export async function updateCharacter(updatedCharacter: Partial<Character>): Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const charactersCollection = await getCharactersCollection(client);
    const _id = new ObjectId(updatedCharacter._id);
    let character = updatedCharacter;
    delete character._id;
    const response = await charactersCollection.updateOne({_id}, {$set: character});

    await client.close();
    return response.modifiedCount > 0;
}

/** Delete a character
 *
 * @param id The ID of the character
 */
export async function deleteCharacter(id: string): Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const charactersCollection = await getCharactersCollection(client);
    const _id = new ObjectId(id);
    const character = await charactersCollection.deleteOne({_id});

    await client.close();
    return character.deletedCount > 0;
}