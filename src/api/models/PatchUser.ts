/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatchUser = {
    email?: string;
    login?: string;
    first_name?: string;
    last_name?: string;
    tg_login?: string;
    city?: string;
    about_me?: string;
    interests?: Array<'Coffee' | 'ProductManagement' | 'Programming' | 'MachineLearning' | 'GameDev' | 'Sport' | 'Music'>;
    meeting_mode?: PatchUser.meeting_mode;
    meeting_time?: {
        start: number;
        end: number;
    };
    meeting_language?: PatchUser.meeting_language;
};

export namespace PatchUser {

    export enum meeting_mode {
        ONLINE = 'Online',
        OFFLINE = 'Offline',
        HYBRID = 'Hybrid',
    }

    export enum meeting_language {
        RU = 'RU',
        EN = 'EN',
    }


}

