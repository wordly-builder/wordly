"use server";

import {connectToCluster, getMapPanelsCollection} from "../utils";
import {ObjectId} from "mongodb";

export async function getMapPanels() {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const mapPanelsCollection = await getMapPanelsCollection(client);
    const mapPanels = await mapPanelsCollection.find().toArray();

    await client.close();

    return mapPanels;
}

export async function getMapPanelById(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const mapPanelsCollection = await getMapPanelsCollection(client);
    const _id = new ObjectId(id);
    const mapPanel = await mapPanelsCollection.findOne({_id});

    await client.close();

    return mapPanel;
}

export async function getMapPanelsByOwner(owner: string) {
    const client = await connectToCluster();

    if (!client) {
        return [];
    }

    const mapPanelsCollection = await getMapPanelsCollection(client);
    const mapPanels = await mapPanelsCollection.find({owner: new ObjectId(owner)}).toArray();

    await client.close();

    return mapPanels;
}

export async function createMapPanel(name: string, owner: number) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const mapPanelsCollection = await getMapPanelsCollection(client);
    const mapPanel = await mapPanelsCollection.insertOne({name, owner});

    await client.close();
}

export async function updateMapPanel(id: string, name: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const mapPanelsCollection = await getMapPanelsCollection(client);
    const _id = new ObjectId(id);
    const mapPanel = await mapPanelsCollection.updateOne({_id}, {$set: {name}});

    await client.close();
}

export async function deleteMapPanel(id: string) {
    const client = await connectToCluster();

    if (!client) {
        return null;
    }

    const mapPanelsCollection = await getMapPanelsCollection(client);
    const _id = new ObjectId(id);
    const mapPanel = await mapPanelsCollection.deleteOne({_id});

    await client.close();
}