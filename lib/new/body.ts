import {createChain, extractMeta} from './chain';
import {validate} from './validate';
import {transform} from './transform';
import {FieldChain} from './field';

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

export const body: Body = (...args: any[]) =>
    Object.assign(function handler(req, res, next) {
        const meta = extractMeta(handler as any);
        req.validationErrors = validate(meta, req);
        req.body = transform(meta, req);
        next();
    }, chain, {meta: {field: 'body', sub: args.map(extractMeta)}}) as any;