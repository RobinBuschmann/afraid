import {createChain} from '../meta/functional/chain-creator';
import {validate} from '../validation/validate';
import {transform} from '../transformation/transform';
import {FieldChain} from '../meta/functional/field';
import {extractMeta} from '../meta/meta-utils';
import {plainToClass} from 'class-transformer';
import {resolveFieldMeta} from '../meta/class/field-meta';

interface Handler {
    (...a: object[]);
}

interface BodyChain<OBJ> extends Handler {
    array(): BodyChain<Array<OBJ>>;

    opt(): BodyChain<OBJ | undefined>;
}

interface Body {
    <T1>(chain: FieldChain<T1>): BodyChain<T1>;

    <T1, T2>(chain1: FieldChain<T1>, chain2: FieldChain<T2>): BodyChain<T1 & T2>;

    <T1, T2, T3>(chain1: FieldChain<T1>, chain2: FieldChain<T2>, chain3: FieldChain<T3>): BodyChain<T1 & T2 & T3>;
}

const chain = createChain(['opt', 'array']);

export const body: Body = (...args: any[]) => {
    const [classReference] = args;
    const bodyMeta = typeof classReference === 'function'
    ? {transformers: [v => plainToClass(classReference, v)], fields: resolveFieldMeta(classReference)}
    : {fields: args.map(extractMeta)};

    return Object.assign(
        function handler(req, res, next) {
            const meta = extractMeta(handler as any);
            const wrappedBody = {body: req.body};
            req.validationErrors = validate([meta], wrappedBody);
            Object.assign(req, transform(meta, wrappedBody));
            next();
        },
        chain,
        {meta: {field: 'body', ...bodyMeta}},
    ) as any
};
