import type { Feature } from '$lib/types/feature';
import { registerPanel, unregisterPanel } from '$lib/types/panels/panels';
import CharactersPanel from '$lib/types/features/panels/character/CharactersPanel.svelte';

export const charactersFeature: Feature = {
    id: "CHARACTERS",
    name: "Characters",
    description: "Create and manage characters for your project.",
    iconWhite: "images/features/icon_characters_white.svg",
    iconBlack: "images/features/icon_characters_black.svg",
    requiredFeatures: [],
    onEnable: (loroDoc) => {
        registerPanel({
            id: "CHARACTERS",
            name: "Characters",
            iconWhite: "images/features/icon_characters_white.svg",
            iconBlack: "images/features/icon_characters_black.svg",
            display: CharactersPanel
        })
    },
    onDisable: (loroDoc) => {
        unregisterPanel("CHARACTERS");
    },
};