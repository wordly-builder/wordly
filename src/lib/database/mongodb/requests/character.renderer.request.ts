"use server";

import {connectToCluster, getCharactersRenderersCollection} from "../utils";
import {ObjectId} from "mongodb";

export async function getCharactersRenderers() {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersRenderersCollection = await getCharactersRenderersCollection(client);
    const charactersRenderers = await charactersRenderersCollection.find().toArray();

    await client.close();

    return charactersRenderers;
}

export async function getCharacterRendererById(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersRenderersCollection = await getCharactersRenderersCollection(client);
    const _id = new ObjectId(id);
    const characterRenderer = await charactersRenderersCollection.findOne({_id});

    await client.close();

    return characterRenderer;
}

export async function getCharactersRenderersByOwner(owner: number) {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const charactersRenderersCollection = await getCharactersRenderersCollection(client);
    const charactersRenderers = await charactersRenderersCollection.find({owner}).toArray();

    await client.close();

    return charactersRenderers;
}

export async function createCharacterRenderer(name: string, owner: number) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersRenderersCollection = await getCharactersRenderersCollection(client);
    const characterRenderer = await charactersRenderersCollection.insertOne({name, owner});

    await client.close();
}

export async function updateCharacterRenderer(id: string, name: string, owner: number) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersRenderersCollection = await getCharactersRenderersCollection(client);
    const _id = new ObjectId(id);
    const characterRenderer = await charactersRenderersCollection.updateOne({_id}, {name, owner});

    await client.close();
}

export async function deleteCharacterRenderer(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const charactersRenderersCollection = await getCharactersRenderersCollection(client);
    const _id = new ObjectId(id);
    const characterRenderer = await charactersRenderersCollection.deleteOne({_id});

    await client.close();
}
