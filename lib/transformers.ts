import {
    body as evBody,
    cookie as evCookie,
    header as evHeader,
    param as evParam,
    query as evQuery,
    ValidatorOptions,
} from 'express-validator/check';
import {BodyClassTransformerChain, TransformerChain} from './transformer';
import {bodyClassTransformer} from './body-class-transformer';
import IsFloatOptions = ValidatorOptions.IsFloatOptions;
import IsIntOptions = ValidatorOptions.IsIntOptions;

const base = {
    string<R>(this: TransformerChain<R>) {
        return this.customSanitizer((
            value: string,
        ) => value);
    },
    opt<R>(this: TransformerChain<R>) {
        return this.optional();
    },
    float<R>(this: TransformerChain<R>, options?: IsFloatOptions) {
        return this.isFloat(options).toFloat();
    },
    int<R>(this: TransformerChain<R>, options: IsIntOptions & { radix?: number } = {}) {
        return this.isInt().toInt(options.radix);
    },
    boolean<R>(this: TransformerChain<R>, strict?: boolean) {
        return this.isBoolean().toBoolean(strict);
    },
    date<R>(this: TransformerChain<R>) {
        return this.toDate();
    },
    array<R>(this: TransformerChain<R>) {
        return this.customSanitizer((
            value: string,
            options: { req, location: string, path: string },
        ) => Array.isArray(value) ? value : [value]);
    },
};

export const query = <F extends string>(field: F): TransformerChain<{ query: { [X in F]: string } }> =>
    Object.assign(evQuery(field), base).exists();

export const cookie = <F extends string>(field: F): TransformerChain<{ cookies: { [X in F]: string } }> =>
    Object.assign(evCookie(field), base).exists();

export const header = <F extends string>(field: F): TransformerChain<{ headers: { [X in F]: string } }> =>
    Object.assign(evHeader(field), base).exists();

export const param = <F extends string>(field: F): TransformerChain<{ params: { [X in F]: string } }> =>
    Object.assign(evParam(field), base).exists();

interface BodyTransformerFactory {
    <F extends string>(field: F): TransformerChain<{ body: { [X in F]: string|number|boolean } }>;
    <T>(type: new() => T): BodyClassTransformerChain<{ body: T }>;
}
export const body: BodyTransformerFactory = typeOrField =>
    (typeof typeOrField === 'string'
        ? Object.assign(evBody(typeOrField), base).exists()
        : bodyClassTransformer(typeOrField)) as any;
