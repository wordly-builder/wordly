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
    getUniversesByOwner, updateUniverse
} from "./requests/universes.requests";
import {getAccountByUserId} from "./requests/auth.requests";

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
    }
}
