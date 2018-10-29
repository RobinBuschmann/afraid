import {createChain} from '../meta/functional/chain-factory';
import {resolveFieldMeta as resolveClassFieldMeta} from '../meta/class/field-meta';
import {resolveFieldMeta as resolveFunctionalFieldMeta} from '../meta/functional/field-meta';
import {extractMeta} from '../meta/meta-utils';
import {validate} from '../validation/validate';
import {transform} from '../transformation/transform';

const chain = createChain();

export const createMiddleware = target => (...args: any[]) => {
    const [classReference] = args;
    const targetMeta = typeof classReference === 'function'
        ? resolveClassFieldMeta(classReference)
        : resolveFunctionalFieldMeta(args);

    return Object.assign(
        function handler(req, res, next) {
            const meta = extractMeta(handler as any);
            const wrapped = {[target]: req[target]};
            // todo optimize/make async
            req.validationErrors = validate([meta], wrapped);

            // todo optimize/make async
            Object.assign(req, transform([meta], wrapped));
            next();
        },
        chain,
        {meta: {field: target, ...targetMeta}},
    ) as any
};