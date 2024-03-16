import { env } from './env';

const HOST = env.BACKEND_HOST
    ? env.BACKEND_HOST
    : `${window.location.protocol}//${window.location.hostname}:${env.BACKEND_PORT}`;

export const absoluteUrl = (path: `/${string}`) => `${HOST}${path}`;

export const openapiBaseUrl = HOST
