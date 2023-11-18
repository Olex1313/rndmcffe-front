/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
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
     * @param id The user id
     * @param requestBody Raw data for image
     * @returns any Image successfully added to user profile
     *
     * @throws ApiError
     */
    public static addPhoto(
        id: number,
        requestBody: RawImage,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user_pics/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/jpeg',
            errors: {
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions to edit this user profile`,
            },
        });
    }

}
