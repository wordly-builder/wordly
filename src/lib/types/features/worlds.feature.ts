import type { Feature } from '$lib/types/feature';

export const worldsFeature: Feature = {
    id: "WORLDS",
    name: "Worlds",
    description: "Create and manage multiple worlds for your project.",
    iconWhite: "images/features/icon_worlds_white.svg",
    iconBlack: "images/features/icon_worlds_black.svg",
    requiredFeatures: [],
    onEnable: (loroDoc) => {
        loroDoc.getMap("worlds");
    },
    onDisable: (loroDoc) => {
        loroDoc.getMap("worlds").clear();
    }
};