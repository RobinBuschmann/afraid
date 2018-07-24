import {param as evParam, query as evQuery, Validator, ValidatorOptions} from 'express-validator/check';
import {ValidationChain} from 'express-validator/check/check';
import IsFloatOptions = ValidatorOptions.IsFloatOptions;
import IsIntOptions = ValidatorOptions.IsIntOptions;
import {Sanitizer} from 'express-validator/filter';

export interface Transformer<REQUEST> extends Validator, Sanitizer {

    date(): Transformer<SetTypeLayer1<REQUEST, Date>>
    float(options?: IsFloatOptions): Transformer<SetTypeLayer1<REQUEST, number>>
    int(options?: IsIntOptions & { radix?: number }): Transformer<SetTypeLayer1<REQUEST, number>>
    string(): Transformer<SetTypeLayer1<REQUEST, string>>
    boolean(strict?: boolean): Transformer<SetTypeLayer1<REQUEST, boolean>>
    array(): Transformer<ArrayfyLayer1<REQUEST>>;
    opt(): Transformer<PartialLayer1<REQUEST>>;
    (...a: object[]);
}

type SetTypeLayer1<Target, Type> = { [P in keyof Target]: SetType<Target[P], Type>; }
type SetType<Target, Type> = { [P in keyof Target]: Type; }
type PartialLayer1<T> = { [P in keyof T]: Partial<T[P]>; }
type ArrayfyLayer1<Target> = { [P in keyof Target]: Arrayfy<Target[P]>; };
type Arrayfy<Target> = { [P in keyof Target]: Array<Target[P]>; }

const ext = {
    string(this: ValidationChain) {
        return this.customSanitizer((
            value: string
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

export const query = <F extends string>(field: F) => Object.assign(evQuery(field), ext) as any as Transformer<{query: {[X in F]: any}}>;
export const param = <F extends string>(field: F) => Object.assign(evParam(field), ext) as any as Transformer<{params: {[X in F]: any}}>;
export const body = <FT>(type: (new() => FT)): Transformer<{body: FT}> => ((req, res, next) => next()) as any;