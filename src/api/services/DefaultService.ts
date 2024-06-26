/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Club } from '../models/Club';
import type { LoginRequest } from '../models/LoginRequest';
import type { NewClub } from '../models/NewClub';
import type { RawImage } from '../models/RawImage';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Logs in and returns the authentication cookie
     * @param requestBody A JSON object containing the login and password.
     * @returns string Successfully authenticated. The session ID is returned in a cookie named `SESSION_ID`. You need to include this cookie in subsequent requests.
     *
     * @throws ApiError
     */
    public static userLogin(
        requestBody: LoginRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'Set-Cookie',
            errors: {
                400: `Invalid login or password`,
            },
        });
    }

    /**
     * Deletes current user session
     * @returns any session deleted
     * @throws ApiError
     */
    public static userLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/logout',
            errors: {
                401: `possibly missing session id cookie or it is invalid`,
            },
        });
    }

    /**
     * Registers a new website user
     * @param requestBody A JSON object containing essential user data
     * @returns User Successfully registered You now may proceed to login form
     *
     * @throws ApiError
     */
    public static userRegister(
        requestBody: RegisterRequest,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Specified data is invalid, possibly trying to register existing login
                `,
            },
        });
    }

    /**
     * Build new club
     * @param requestBody A JSON object containing club data
     * @returns Club clubs gotten
     *
     * @throws ApiError
     */
    public static addNewClub(
        requestBody: NewClub,
    ): CancelablePromise<Club> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/clubs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Specified data is invalid
                `,
            },
        });
    }

    /**
     * Get list of clubs
     * @returns Club club gotten
     *
     * @throws ApiError
     */
    public static getClubs(): CancelablePromise<Array<Club>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clubs',
            errors: {
                400: `Specified data is invalid
                `,
            },
        });
    }

    /**
     * Add new photo to club
     * @param id id of club
     * @param requestBody Raw data for image
     * @returns any Image successfully added
     *
     * @throws ApiError
     */
    public static addPhotoToClub(
        id: number,
        requestBody: RawImage,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/clubs/{id}/pic',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/jpeg',
        });
    }

    /**
     * Generate a new meeings round for a given period
     * @param date A day for generating meetings
     * @returns any Meetings created
     *
     * @throws ApiError
     */
    public static generateContactsRound(
        date: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/contacts',
            query: {
                'date': date,
            },
            errors: {
                400: `Invalid meeting period`,
            },
        });
    }

}
