import {createMiddleware} from './middleware-factory';
import {Chain, ChainBundler} from '../meta/functional/chain';

export const body: ChainBundler<{body}> = createMiddleware('body') as any;
export const query: ChainBundler<{query}> = createMiddleware('query') as any;
export const params: ChainBundler<{params}> = createMiddleware('params') as any;
export const headers: ChainBundler<{headers}> = createMiddleware('headers') as any;
export const cookies: ChainBundler<{cookies}> = createMiddleware('cookies') as any;

export const fail: Chain<{validationErrors}> = ((req, res, next) => {
    const validationErrors = (req.validationErrors || []);
    if(validationErrors.length) {
        // todo
        next({statusCode: 400});
        return;
    }
    next();
}) as any;
