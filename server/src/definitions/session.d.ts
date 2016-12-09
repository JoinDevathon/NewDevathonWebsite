/// <reference types="express-session" />

declare namespace Express {
    export interface Session {
        userId: number;
    }
}