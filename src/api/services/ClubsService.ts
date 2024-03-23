/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Club } from '../models/Club';
import type { RawImage } from '../models/RawImage';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClubsService {

    /**
     * Subscribe current user to club
     * @param id id of new club
     * @returns any You added to the club
     *
     * @throws ApiError
     */
    public static addUserToClub(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/me/clubs/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Club not found`,
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions`,
            },
        });
    }

    /**
     * Delete club
     * @param id The club-id
     * @returns any club delete
     *
     * @throws ApiError
     */
    public static deleteClubById(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/clubs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `club not found`,
            },
        });
    }

    /**
     * Get club
     * @param id The club-id
     * @returns Club club info
     *
     * @throws ApiError
     */
    public static getClubById(
        id: number,
    ): CancelablePromise<Club> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clubs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `club not found`,
            },
        });
    }

    /**
     * Get club logo
     * @param id The club-id
     * @returns RawImage bytes of the avatar
     *
     * @throws ApiError
     */
    public static getClubPic(
        id: number,
    ): CancelablePromise<RawImage> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clubs/{id}/pic',
            path: {
                'id': id,
            },
            errors: {
                404: `img not found`,
            },
        });
    }

}
