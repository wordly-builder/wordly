import {createSession, generateSessionToken, invalidateSession, validateSessionToken} from "./requests/auth.requests";
import {
    createUserWithEmail,
    createUserWithGithub,
    createUserWithGoogle,
    getUserByEmail,
    getUserById,
    hashPassword,
    loginWithEmail,
    verifyEmailInput,
    verifyPasswordInput,
    verifyUsernameInput
} from "./requests/user.requests";
import {migrateDatabase} from "./index";

export const postgres = {
    migrate: migrateDatabase,
    auth: {
        verifyEmail: verifyEmailInput,
        verifyUsername: verifyUsernameInput,
        verifyPassword: verifyPasswordInput,
        hashPassword: hashPassword,
        loginWithEmail: loginWithEmail,
    },
    session: {
        generateToken: generateSessionToken,
        create: createSession,
        validate: validateSessionToken,
        invalidate: invalidateSession,

    },
    user: {
        createWithEmail: createUserWithEmail,
        createWithGithub: createUserWithGithub,
        createWithGoogle: createUserWithGoogle,
        get: getUserById,
        getByEmail: getUserByEmail,

    }
}
