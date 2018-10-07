import {Validator, ValidatorOptions} from 'express-validator/check';
import {Sanitizer} from 'express-validator/filter';
import {TransformerMeta} from './metadata';
import {Arrayfy, ArrayfyLayer1, PartialLayer1, SetTypeLayer1} from './utils';
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
    // field<F extends string>(name: F): FieldChain<TARGET, PREV & {[K2 in F]: string}>;
}

export interface InternalTransformerChain extends TransformerChain<{}> {
    transformer: TransformerMeta;
}

export interface BodyClassTransformerChain<REQUEST> extends BaseTransformer<REQUEST> {
    array(): BodyClassTransformerChain<Arrayfy<REQUEST>>;
    opt(): BodyClassTransformerChain<Partial<REQUEST>>;
}

