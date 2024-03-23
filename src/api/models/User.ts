/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    id: number;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
    tg_login: string;
    avatar: string;
    city: string;
    about_me: string;
    interests: Array<'Coffee' | 'ProductManagement' | 'Programming' | 'MachineLearning' | 'GameDev' | 'Sport' | 'Music'>;
    meeting_mode: User.meeting_mode;
    meeting_time: {
        start: number;
        end: number;
    };
    meeting_language: User.meeting_language;
};

export namespace User {

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

