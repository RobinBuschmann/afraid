import {createMiddleware} from './middleware-factory';

export const body = createMiddleware('body');
export const query = createMiddleware('query');
export const params = createMiddleware('params');
export const headers = createMiddleware('headers');
export const cookies = createMiddleware('cookies');
