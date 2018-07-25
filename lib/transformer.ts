import {
    cookie as evCookie,
    header as evHeader,
    param as evParam,
    query as evQuery,
    ValidationChain,
    Validator,
    ValidatorOptions,
} from 'express-validator/check';
import {Sanitizer} from 'express-validator/filter';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';
import IsFloatOptions = ValidatorOptions.IsFloatOptions;
import IsIntOptions = ValidatorOptions.IsIntOptions;

export type Transformer<REQUEST> = BaseTransformer<REQUEST> | TransformerChain<REQUEST>;

export interface BaseTransformer<REQUEST> {
    (...a: object[]);
}

export interface TransformerChain<REQUEST> extends BaseTransformer<REQUEST>, Validator, Sanitizer {

    date(): TransformerChain<SetTypeLayer1<REQUEST, Date>>

    float(options?: IsFloatOptions): TransformerChain<SetTypeLayer1<REQUEST, number>>

    int(options?: IsIntOptions & { radix?: number }): TransformerChain<SetTypeLayer1<REQUEST, number>>

    string(): TransformerChain<SetTypeLayer1<REQUEST, string>>

    boolean(strict?: boolean): TransformerChain<SetTypeLayer1<REQUEST, boolean>>

    array(): TransformerChain<ArrayfyLayer1<REQUEST>>;

    opt(): TransformerChain<PartialLayer1<REQUEST>>;
}

type SetTypeLayer1<Target, Type> = { [P in keyof Target]: SetType<Target[P], Type>; }
type SetType<Target, Type> = { [P in keyof Target]: Type; }
type PartialLayer1<T> = { [P in keyof T]: Partial<T[P]>; }
type ArrayfyLayer1<Target> = { [P in keyof Target]: Arrayfy<Target[P]>; };
type Arrayfy<Target> = { [P in keyof Target]: Array<Target[P]>; }

const ext = {
    string(this: ValidationChain) {
        return this.customSanitizer((
            value: string,
        ) => value) as any;
    },
    opt(this: ValidationChain) {
        return this.optional();
    },
    float(this: ValidationChain, options?: IsFloatOptions) {
        return this.isFloat(options).toFloat() as any;
    },
    int(this: ValidationChain, options: IsIntOptions & { radix?: number } = {}) {
        return this.isInt().toInt(options.radix) as any;
    },
    boolean(this: ValidationChain, strict?: boolean) {
        return this.isBoolean().toBoolean(strict) as any;
    },
    date(this: ValidationChain) {
        return this.toDate() as any;
    },
    array(this: ValidationChain) {
        return this.customSanitizer((
            value: string,
            options: { req, location: string, path: string },
        ) => Array.isArray(value) ? value : [value]) as any;
    },
};

export const query = <F extends string>(field: F) => Object.assign(evQuery(field), ext) as any as TransformerChain<{ query: { [X in F]: any } }>;
export const cookie = <F extends string>(field: F) => Object.assign(evCookie(field), ext) as any as TransformerChain<{ cookies: { [X in F]: any } }>;
export const header = <F extends string>(field: F) => Object.assign(evHeader(field), ext) as any as TransformerChain<{ headers: { [X in F]: any } }>;
export const param = <F extends string>(field: F) => Object.assign(evParam(field), ext) as any as TransformerChain<{ params: { [X in F]: any } }>;
export const body = <FT>(type: (new() => FT)): BaseTransformer<{ body: FT }> => Object.assign(async function transformer(req, res, next) {
    const mapError = err => ({
        location: 'body',
        param: req.path,
        value: req.body,
        msg: err.toString(),
    });
    const addValidationErrors = err => req._validationErrors = (req._validationErrors || []).concat(err);
    try {
        const value = plainToClass(type, req.body);
        const errors = await validate(value);
        addValidationErrors(errors.map(mapError));
        req.body = value;
    } catch (e) {
        addValidationErrors(mapError(e));
    }
    next();
});
