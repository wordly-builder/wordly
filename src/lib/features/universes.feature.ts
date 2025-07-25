import type {Feature} from "$lib/features/feature";

export const universesFeature: Feature = {
    id: "UNIVERSES",
    name: "Universes",
    description: "Create and manage multiple universes for your project.",
    iconWhite: "images/features/icon_universes_white.svg",
    iconBlack: "images/features/icon_universes_black.svg",
    requiredFeatures: ["WORLDS"]
};