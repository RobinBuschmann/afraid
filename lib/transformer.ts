import {Validator, ValidatorOptions} from 'express-validator/check';
import {Sanitizer} from 'express-validator/filter';
import IsFloatOptions = ValidatorOptions.IsFloatOptions;
import IsIntOptions = ValidatorOptions.IsIntOptions;

export type Transformer<REQUEST> = BaseTransformer<REQUEST> |
    TransformerChain<REQUEST> |
    BodyClassTransformerChain<REQUEST>;

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

export interface BodyClassTransformerChain<REQUEST> extends BaseTransformer<REQUEST> {
    array(): BodyClassTransformerChain<Arrayfy<REQUEST>>;
    opt(): BodyClassTransformerChain<Partial<REQUEST>>;
}

type SetTypeLayer1<T, TYPE> = { [P in keyof T]: SetType<T[P], TYPE>; }
type SetType<T, TYPE> = { [P in keyof T]: TYPE; };
type PartialLayer1<T> = { [P in keyof T]: Partial<T[P]>; };
type ArrayfyLayer1<T> = { [P in keyof T]: Arrayfy<T[P]>; };
type Arrayfy<T> = { [P in keyof T]: Array<T[P]>; };
