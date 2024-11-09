"use server";

import {connectToCluster, getCharacterTemplatesCollection} from "../utils";
import {ObjectId} from "mongodb";
import type {CharacterTemplate, NewCharacterTemplate} from "../models/character.template";

export async function getCharactersTemplates() {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersTemplatesCollection = await getCharacterTemplatesCollection(client);
    const charactersTemplates = await charactersTemplatesCollection.find().toArray();

    await client.close();

    return charactersTemplates;
}

export async function getCharacterTemplateById(id: string): Promise<CharacterTemplate | null> {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersTemplatesCollection = await getCharacterTemplatesCollection(client);
    const _id = new ObjectId(id);
    const characterTemplate = await charactersTemplatesCollection.findOne({_id});

    await client.close();

    return characterTemplate as CharacterTemplate | null;
}

export async function getCharactersTemplatesByOwner(owner: string) {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersTemplatesCollection = await getCharacterTemplatesCollection(client);
    const charactersTemplates = await charactersTemplatesCollection.find({owner: new ObjectId(owner)}).toArray();

    await client.close();

    return charactersTemplates;
}

export async function createCharacterTemplate(name: string, owner: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const newCharacterTemplate: NewCharacterTemplate = {
        name,
        owner: new ObjectId(owner),
        fields: []
    }

    const charactersTemplatesCollection = await getCharacterTemplatesCollection(client);
    const characterTemplateResponse = await charactersTemplatesCollection.insertOne(newCharacterTemplate);

    await client.close();
    const characterTemplate: CharacterTemplate = {
        ...newCharacterTemplate,
        _id: characterTemplateResponse.insertedId,
    }

    return characterTemplate;
}

export async function deleteCharacterTemplate(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersTemplatesCollection = await getCharacterTemplatesCollection(client);
    const _id = new ObjectId(id);
    const characterTemplate = await charactersTemplatesCollection.deleteOne({_id});

    await client.close();
}

/** Update a character template
 * @param template - The template to update
 * @returns True if the template was updated, false otherwise
 */
export async function updateCharacterTemplate(template: Partial<CharacterTemplate>) : Promise<boolean> {
    const client = await connectToCluster();

    if (!client) {
        return false;
    }

    const charactersTemplatesCollection = await getCharacterTemplatesCollection(client);
    const _id = new ObjectId(template._id);
    let partialTemplate = {...template};
    delete partialTemplate._id;
    const characterTemplate = await charactersTemplatesCollection.updateOne({_id}, {$set: partialTemplate});

    await client.close();

    return characterTemplate.acknowledged;
}