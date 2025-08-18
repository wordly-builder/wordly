import type { Feature } from '$lib/types/feature';
import { registerPanel } from '$lib/types/panels/panels';
import WorldsPanel from '$lib/types/features/panels/WorldsPanel.svelte';

export const worldsFeature: Feature = {
    id: "WORLDS",
    name: "Worlds",
    description: "Create and manage multiple worlds for your project.",
    iconWhite: "images/features/icon_worlds_white.svg",
    iconBlack: "images/features/icon_worlds_black.svg",
    requiredFeatures: [],
    onEnable: (loroDoc) => {
        registerPanel({
            id: "WORLDS",
            name: "Worlds",
            iconWhite: "images/features/icon_worlds_white.svg",
            iconBlack: "images/features/icon_worlds_black.svg",
            display: WorldsPanel
        })
    },
    onDisable: (loroDoc) => {

    }
};