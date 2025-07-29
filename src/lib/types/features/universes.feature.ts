import type { Feature } from '$lib/types/feature';
import { registerPanel, unregisterPanel } from '$lib/types/panels/panels';
import UniversesPanel from '$lib/types/features/panels/UniversesPanel.svelte';

export const universesFeature: Feature = {
    id: "UNIVERSES",
    name: "Universes",
    description: "Create and manage multiple universes for your project.",
    iconWhite: "images/features/icon_universes_white.svg",
    iconBlack: "images/features/icon_universes_black.svg",
    requiredFeatures: ["WORLDS"],
    onEnable: (loroDoc) => {
        registerPanel({
            id: "UNIVERSES",
            name: "Universes",
            iconWhite: "images/features/icon_universes_white.svg",
            iconBlack: "images/features/icon_universes_black.svg",
            display: UniversesPanel
          });
    },
    onDisable: (loroDoc) => {
        unregisterPanel("UNIVERSES");
    },
};