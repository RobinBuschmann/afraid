import {OneOfChainBundler} from '../meta/functional/chain';
import {mergeMeta} from '../meta/meta-utils';

export const oneOf: OneOfChainBundler = ((...middlewares: any[]) => {
    const extractValidationErrorsBeforeOneOf = (req, res, next) => {
        req.lastValidationErrors = req.validationErrorsBeforeOneOfMiddlewares = [...(req.validationErrors || [])];
        next();
    };
    const isOneOfValidationsSuccessful = (req, res, next) => {
        req.isOneOfValid = req.isOneOfValid || req.lastValidationErrors.length === req.validationErrors.length;
        req.lastValidationErrors = [...req.validationErrors];
        next();
    };
    const resetValidationErrorsWhenOneOfIsValid = (req, res, next) => {
        if (req.isOneOfValid) {
            req.validationErrors = req.validationErrorsBeforeOneOfMiddlewares;
        }
        next();
    };

    middlewares = middlewares.reduce((preparedMiddlewares, middleware) => [
        ...preparedMiddlewares,
        Object.assign(middleware, {meta: mergeMeta((middleware.meta || {}), {isOneOfMany: true})}),
        isOneOfValidationsSuccessful,
    ], []);
    return [extractValidationErrorsBeforeOneOf, ...middlewares, resetValidationErrorsWhenOneOfIsValid];
}) as any;
