import { request } from '@playwright/test';

export const apiClient = async () => {
    return await request.newContext({
        baseURL: 'http://localhost:8080',
    });
};