/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
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
            url: '/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing session id in request`,
                403: `Current user doesn't have permissions to see this user profile`,
            },
        });
    }

}
