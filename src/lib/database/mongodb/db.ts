"use server";

import {
    createUniverse,
    deleteUniverse, getActivePanels, getInactivePanels,
    getUniverseById,
    getUniverses,
    getUniversesByOwner, updateUniverse
} from "./requests/universes.request";
import {
    createCharactersPanel, deleteCharactersPanel,
    getCharactersPanelById, getCharactersPanels,
    getCharactersPanelsByOwner, updateCharactersPanel
} from "./requests/character.panel.request";
import {
    createCharacterTemplate, deleteCharacterTemplate,
    getCharactersTemplates,
    getCharactersTemplatesByOwner,
    getCharacterTemplateById, updateCharacterTemplate
} from "./requests/character.template.request";
import {
    createCharacter,
    deleteCharacter,
    getCharacterById,
    getCharacters,
    getCharactersByOwner
} from "./requests/character.request";
import {
    createCharacterRenderer, deleteCharacterRenderer,
    getCharacterRendererById,
    getCharactersRenderers,
    getCharactersRenderersByOwner
} from "./requests/character.renderer.request";
import {createMapPanel, deleteMapPanel, getMapPanelById, getMapPanels, getMapPanelsByOwner} from "./requests/map.panel.request";

export const mongodb = {
    universe: {
        getAll: getUniverses,
        getById: getUniverseById,
        getByOwner: getUniversesByOwner,
        create: createUniverse,
        delete: deleteUniverse,
        update: updateUniverse,
        inactivePanels: getInactivePanels,
        activePanels: getActivePanels
    },
    charactersPanel: {
        getAll: getCharactersPanels,
        getById: getCharactersPanelById,
        getByOwner: getCharactersPanelsByOwner,
        create: createCharactersPanel,
        delete: deleteCharactersPanel,
        update: updateCharactersPanel,
    },
    charactersTemplates: {
        getAll: getCharactersTemplates,
        getById: getCharacterTemplateById,
        getByOwner: getCharactersTemplatesByOwner,
        create: createCharacterTemplate,
        delete: deleteCharacterTemplate,
        update: updateCharacterTemplate,
    },
    characters: {
        getAll: getCharacters,
        getById: getCharacterById,
        getByOwner: getCharactersByOwner,
        create: createCharacter,
        delete: deleteCharacter,
    },
    charactersRenderers: {
        getAll: getCharactersRenderers,
        getById: getCharacterRendererById,
        getByOwner: getCharactersRenderersByOwner,
        create: createCharacterRenderer,
        delete: deleteCharacterRenderer,
    },
    mapPanel: {
        getAll: getMapPanels,
        getById: getMapPanelById,
        getByOwner: getMapPanelsByOwner,
        create: createMapPanel,
        delete: deleteMapPanel,
    }
}