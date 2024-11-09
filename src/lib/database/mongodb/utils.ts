"use server";

import { MONGO_URL } from "$env/static/private"
import {MongoClient} from "mongodb";

export async function connectToCluster() {
    let mongoClient;

    try {
        mongoClient = new MongoClient(MONGO_URL);
        await mongoClient.connect();

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
    }
}

export async function closeConnection(client: MongoClient) {
    try {
        await client.close();
    } catch (error) {
        console.error('Failed to close connection to MongoDB Atlas!', error);
    }
}

export async function getDatabase(client: MongoClient) {
    return client.db('wordly');
}

export async function getUniversesCollection(client: MongoClient) {
    return (await getDatabase(client)).collection('universes');
}

export async function getCharactersPanelsCollection(client: MongoClient) {
    return (await getDatabase(client)).collection('charactersPanels');
}

export async function getCharactersCollection(client: MongoClient) {
    return (await getDatabase(client)).collection('characters');
}

export async function getCharacterTemplatesCollection(client: MongoClient) {
    return (await getDatabase(client)).collection('characterTemplates');
}

export async function getCharactersRenderersCollection(client: MongoClient) {
    return (await getDatabase(client)).collection('characterRenderers');

}

export async function getMapPanelsCollection(client: MongoClient) {
    return (await getDatabase(client)).collection('mapPanel');
}