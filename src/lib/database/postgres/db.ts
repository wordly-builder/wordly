import {
    createProfile,
    getAllProfiles,
    getProfileByGoogleId,
    getProfileById
} from "./requests/profiles.requests";
import {getAccountByUserId} from "./requests/auth.requests";

export const postgres = {
    auth : {
      getAccountByUserId: getAccountByUserId
    },
    profiles : {
        getAll: getAllProfiles,
        getById: getProfileById,
        getByGoogleId: getProfileByGoogleId,
        create: createProfile,
    },
}
