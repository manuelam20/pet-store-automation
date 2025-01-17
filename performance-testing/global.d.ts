declare module 'k6/http' {
    import { Response } from 'k6/http';
    export function get(url: string, params?: object): Response;
    export function post(url: string, body?: object, params?: object): Response;
    export function put(url: string, body?: object, params?: object): Response;
    export function del(url: string, params?: object): Response;
  }
  
  declare module 'k6' {
    export { check } from 'k6';
    export { sleep } from 'k6';
  }

  declare var __ENV: {
    [key: string]: string | undefined;
  };