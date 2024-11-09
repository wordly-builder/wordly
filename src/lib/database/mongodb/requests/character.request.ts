"use server";

import {connectToCluster, getCharactersCollection} from "../utils";
import {ObjectId} from "mongodb";

export async function getCharacters() {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersCollection = await getCharactersCollection(client);
    const characters = await charactersCollection.find().toArray();

    await client.close();

    return characters;
}

export async function getCharacterById(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersCollection(client);
    const _id = new ObjectId(id);
    const character = await charactersCollection.findOne({_id});

    await client.close();

    return character;
}

export async function getCharactersByOwner(owner: string) {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersCollection = await getCharactersCollection(client);
    const characters = await charactersCollection.find({owner: new ObjectId(owner)}).toArray();

    await client.close();

    return characters;
}

export async function createCharacter(name: string, owner: string, template: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersCollection(client);
    const character = await charactersCollection.insertOne({name, owner: new ObjectId(owner) });

    await client.close();
}

export async function updateCharacter(id: string, name: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersCollection(client);
    const _id = new ObjectId(id);
    const character = await charactersCollection.updateOne({_id}, {$set: {name}});

    await client.close();
}

export async function deleteCharacter(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersCollection = await getCharactersCollection(client);
    const _id = new ObjectId(id);
    const character = await charactersCollection.deleteOne({_id});

    await client.close();
}