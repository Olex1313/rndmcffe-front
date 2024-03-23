/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchUser } from '../models/PatchUser';
import type { RawImage } from '../models/RawImage';
import type { User } from '../models/User';
import type { UserClub } from '../models/UserClub';
import type { UserContact } from '../models/UserContact';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Retrieves current user information
     * @param id The user id
     * @returns User Successfully get user profile
     * @throws ApiError
     */
    public static getUser(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions to see this user profile`,
            },
        });
    }

    /**
     * Update user information
     * @param requestBody New fields to user
     * @returns User Successfully get user profile
     * @throws ApiError
     */
    public static updateMyProfile(
        requestBody: PatchUser,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/jpeg',
            errors: {
                400: `Incorrect params`,
                403: `Not authed`,
            },
        });
    }

    /**
     * Retrieves current user information
     * @returns User Successfully get user profile
     * @throws ApiError
     */
    public static getMyProfile(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
            errors: {
                401: `Missing session id in request`,
            },
        });
    }

    /**
     * Get list of links to user-pics
     * @param id The avatar id
     * @returns RawImage bytes of the avatar
     *
     * @throws ApiError
     */
    public static getUserPic(
        id: string,
    ): CancelablePromise<RawImage> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user_pics/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `img not found`,
            },
        });
    }

    /**
     * Add photo to user profile
     * @param requestBody Raw data for image
     * @returns any Image successfully added to user profile
     *
     * @throws ApiError
     */
    public static addPhoto(
        requestBody: RawImage,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/me/user_pics',
            body: requestBody,
            mediaType: 'application/jpeg',
            errors: {
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions to edit this user profile`,
            },
        });
    }

    /**
     * Get list user's clubs
     * @returns UserClub clubs and you with club
     * @throws ApiError
     */
    public static getUserClubs(): CancelablePromise<Array<UserClub>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/clubs',
            errors: {
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions`,
            },
        });
    }

    /**
     * Get list user's contacts
     * @returns UserContact Get contacts of user
     * @throws ApiError
     */
    public static getUserContacts(): CancelablePromise<Array<UserContact>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/contacts',
            errors: {
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions`,
            },
        });
    }

    /**
     * Unsubscribe current user to club
     * @param id id of club
     * @returns any You removed from club
     *
     * @throws ApiError
     */
    public static removeUserFromClub(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
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

}
