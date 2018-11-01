import {createMiddleware} from './middleware-factory';
import {ChainBundler} from '../meta/functional/chain';

export const body: ChainBundler<{body}> = createMiddleware('body') as any;
export const query = createMiddleware('query');
export const params = createMiddleware('params');
export const headers = createMiddleware('headers');
export const cookies = createMiddleware('cookies');

export const fail: ChainBundler<{}> = ((req, res, next) => {
    const validationErrors = (req.validationErrors || []);
    if(validationErrors.length) {
        // todo
        next({statusCode: 400});
        return;
    }
    next();
}) as any;
