/// <reference path="../firebase-node/index.d.ts" />
/// <reference path="./app/index.d.ts" />
/// <reference path="./auth/index.d.ts" />
/// <reference path="./storage/index.d.ts" />

declare namespace firebase {
    interface UserInfo {
        /**
         * The user's display name (if available).
         */
        displayName?: string;

        /**
         * The user's email address (if available).
         */
        email?: string;

        /**
         * The URL of the user's profile picture (if available).
         */
        photoURL?: string;

        /**
         * The authentication provider ID for the current user. For example, 'facebook.com', or 'google.com'.
         */
        providerId: string;

        /**
         * The user's unique ID.
         */
        uid: string;
    }

    interface User extends UserInfo {
        /**
         * Is the user anonymous.
         */
        isAnonymous: boolean;

        /**
         * Additional provider-specific information about the user.
         */
        providerData: UserInfo[];

        /**
         * A refresh token for the user account. Use only for advanced scenarios that require explicitly refreshing tokens.
         */
        refreshToken: string;

        /**
         * Deletes and signs out the user.
         */
        delete(): Promise<void>;

        /**
         * Returns a JWT token used to identify the user to a Firebase service.
         */
        getToken(forceRefresh?: boolean): Promise<string>;

        /**
         * Links the user account with the given credentials.
         */
        link(credential: auth.AuthCredential): Promise<User>;

        /**
         * Links the authenticated provider to the user account using a pop-up based OAuth flow.
         */
        linkWithPopup(provider: auth.AuthProvider): Promise<auth.UserCredential>;

        /**
         * Links the authenticated provider to the user account using a full-page redirect flow.
         */
        linkWithRedirect(provider: auth.AuthProvider): Promise<void>;

        /**
         * Re-authenticates a user using a fresh credential.
         * Use before operations such as firebase.User#updatePassword that require tokens from recent sign-in attempts.
         */
        reauthenticate(credential: auth.AuthCredential): Promise<void>;
    }
}