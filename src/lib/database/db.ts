import {
    createProfile,
    getAllProfiles,
    getProfileByGoogleId,
    getProfileById
} from "./requests/profiles.requests";
import {
    createUniverse, deleteUniverse,
    getAllUniverses,
    getUniverseById,
    getUniversesByOwner, linkCharactersPanel, linkMapsPanel, updateUniverse
} from "./requests/universes.requests";
import {getAccountByUserId} from "./requests/auth.requests";
import {
    createCharactersPanel, deleteCharactersPanel,
    getAllCharactersPanels,
    getCharactersPanelById
} from "./requests/characters.panels.requests";
import {createMapsPanel, deleteMapsPanel, getAllMapsPanels, getMapsPanelById} from "./requests/maps.panels.requests";
import {
    createCharacter, deleteCharacter,
    getAllCharacters,
    getCharacterById,
    getCharactersByPanel, updateCharacter
} from "./requests/characters.requests";
import {createMap, deleteMap, getAllMaps, getMapById, getMapsByPanel, updateMap} from "./requests/maps.requests";

export const database = {
    auth : {
      getAccountByUserId: getAccountByUserId
    },
    profiles : {
        getAll: getAllProfiles,
        getById: getProfileById,
        getByGoogleId: getProfileByGoogleId,
        create: createProfile,
    },
    universes: {
        getAll: getAllUniverses,
        getById: getUniverseById,
        getByOwner: getUniversesByOwner,
        create: createUniverse,
        update: updateUniverse,
        delete: deleteUniverse,
        linkCharactersPanel: linkCharactersPanel,
        linkMapsPanel: linkMapsPanel
    },
    panels: {
        characters: {
            getAll: getAllCharactersPanels,
            getById: getCharactersPanelById,
            create: createCharactersPanel,
            delete: deleteCharactersPanel
        },
        maps: {
            getAll: getAllMapsPanels,
            getById: getMapsPanelById,
            create: createMapsPanel,
            delete: deleteMapsPanel
        }
    },
    characters: {
        getAll: getAllCharacters,
        getById: getCharacterById,
        getByPanel: getCharactersByPanel,
        create: createCharacter,
        update: updateCharacter,
        delete: deleteCharacter
    },
    maps: {
        getAll: getAllMaps,
        getById: getMapById,
        getByPanel: getMapsByPanel,
        create: createMap,
        update: updateMap,
        delete: deleteMap
    }
}
