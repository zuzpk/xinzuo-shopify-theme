import { APP_VERSION } from "./config";

export const Store = {
    App: "app",
    User: "user"
} as const;

export type Store = (typeof Store)[keyof typeof Store];

export const AppStore = {
    App : {
        version: APP_VERSION,
        debug: true,
        token: null,
        theme: `system`
    },
    User : {
        loading: true,
    } as {
        loading: boolean;
    }
}