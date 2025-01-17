import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    use: {
        baseURL: 'http://localhost:8080',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
        },
    },
    retries: 0,
    reporter: [['list'], ['html']],
});