import {
    createProfile,
    getAllProfiles, getProfileByGithubId,
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
        getByGithubId: getProfileByGithubId,
        create: createProfile,
    },
}
