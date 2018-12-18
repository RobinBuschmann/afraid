import {createMiddleware} from './middleware-factory';
import {Chain} from '../meta/functional/chain';

export type Middleware<R> = Chain<R>;

export const body = createMiddleware('body');
export const query = createMiddleware('query');
export const params = createMiddleware('params');
export const headers = createMiddleware('headers');
export const cookies = createMiddleware('cookies');

export const fail: Middleware<{}> = ((req, res, next) => {
    const validationErrors = (req.validationErrors || []);
    if (validationErrors.length) {
        // todo
        next({statusCode: 400, validationErrors});
        return;
    }
    next();
}) as any;
