import * as validators from 'express-validator/check';
import {BodyClassTransformerChain, TransformerChain} from './transformer';
import {bodyClassTransformer} from './body-class-transformer';
import {metadata} from './metadata';
import {createBase} from './transform/field-transformer';

const defaultType = 'string';
const base = createBase() as TransformerChain<any>;
const createTransformer = (target: 'query' | 'body' | 'cookie' | 'header' | 'param', field) =>
    Object.assign(
        validators[target](field),
        base,
        metadata({field, target, type: defaultType}),
    ).exists();

export const query = <F extends string>(field: F): TransformerChain<{ query: { [X in F]: string } }> =>
    createTransformer('query', field);

export const cookie = <F extends string>(field: F): TransformerChain<{ cookies: { [X in F]: string } }> =>
    createTransformer('cookie', field);

export const header = <F extends string>(field: F): TransformerChain<{ headers: { [X in F]: string } }> =>
    createTransformer('header', field);

export const param = <F extends string>(field: F): TransformerChain<{ params: { [X in F]: string } }> =>
    createTransformer('param', field);

interface BodyTransformerFactory {
    <F extends string>(field: F): TransformerChain<{ body: { [X in F]: string | number | boolean } }>;
    <T>(type: new() => T): BodyClassTransformerChain<{ body: T }>;
}

export const body: BodyTransformerFactory = typeOrField =>
    (typeof typeOrField === 'string'
        ? createTransformer('body', typeOrField)
        : bodyClassTransformer(typeOrField)) as any;
