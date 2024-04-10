import {
    createProfile,
    getAllProfiles,
    getProfileByGoogleId,
    getProfileById
} from "./database/requests/profiles.requests";

export const database = {
    profiles : {
        getAll: getAllProfiles,
        getById: getProfileById,
        getByGoogleId: getProfileByGoogleId,
        createProfile: createProfile,
    }
}
