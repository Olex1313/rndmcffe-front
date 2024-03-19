/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    participation: ParticipationMode;
    id: number;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
    tg_login: string;
    avatar: string;
    city: string;
    interests: Array<string>;
};

export enum ParticipationMode {
    Online = "Онлайн", Offline = "Оффлайн", Hybrid = "Гибрид"
}

export enum ParticipationLanguage {
    RU = "Русский", EN = "Английский"
}
