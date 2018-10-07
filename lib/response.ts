import {metadata} from './metadata';
import {createBase} from './transform/field-transformer';
import {BaseTransformer} from './transformer';
import {Arrayfy, ArrayfyLayer1, PartialLayer1, SetTypeLayer1} from './utils';
import {ValidatorOptions} from 'express-validator/check';
import IsFloatOptions = ValidatorOptions.IsFloatOptions;
import IsIntOptions = ValidatorOptions.IsIntOptions;

export const response: ResponseFactory = typeOrField =>
    (typeof typeOrField === 'string'
        ? createInlineResponse(typeOrField)
        : createClassResponse(typeOrField)) as any;

const base = createBase(['metadata']);

export type ResponseValue<T> = ResponseChain<T> | BodyResponseChain<T>;

export interface ResponseChain<T> extends BaseTransformer<T> {
    date(): ResponseChain<SetTypeLayer1<T, Date>>
    float(options?: IsFloatOptions): ResponseChain<SetTypeLayer1<T, number>>
    int(options?: IsIntOptions & { radix?: number }): ResponseChain<SetTypeLayer1<T, number>>
    string(): ResponseChain<SetTypeLayer1<T, string>>
    boolean(strict?: boolean): ResponseChain<SetTypeLayer1<T, boolean>>
    array(): ResponseChain<Arrayfy<T>>;
    opt(): ResponseChain<PartialLayer1<T>>;
}
export interface BodyResponseChain<REQUEST> extends BaseTransformer<REQUEST> {
    array(): BodyResponseChain<Array<REQUEST>>;
    opt(): BodyResponseChain<Partial<REQUEST>>;
}

interface ResponseFactory {
    <F extends string>(field: F): ResponseChain<{ [X in F]: string | number | boolean }>;
    <T>(type: new() => T): BodyResponseChain<T>;
}

export const createInlineResponse = field => Object.assign((q, s, next) => next(), base, metadata({field}));
export const createClassResponse = type => Object.assign((q, s, next) => next(), base, metadata({type}));
