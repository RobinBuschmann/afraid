import * as validators from "validator";
import {FieldType} from './field-type';
import {extractMeta, getMeta, mergeMeta} from './meta-utils';
import {isTransformerName} from '../transformation/utils';
import {resolveClassFieldMeta} from './class/field-meta';
import {resolveFunctionalFieldMeta} from './functional/field-meta';

const createValidatorMeta = (validator, options) => ({
    validators: [(value, field) => validator(String(value), ...options)
        ? undefined
        : {field, value, msg: (options[validator.length] || '"{name}" validation of field "{field}" failed: "{value}" is not valid')
                .replace('{name}', validator.name)
                .replace('{field}', field)
                .replace('{value}', value)}]
});
const createTransformerMeta = (transformer, options) => ({transformers: [(value) => transformer(value, ...options)]});

export const additionalTypeMeta = {
    toString: {type: FieldType.string},
    toInt: {type: FieldType.int},
    isInt: {type: FieldType.int},
    toFloat: {type: FieldType.float},
    isFloat: {type: FieldType.float},
    toBoolean: {type: FieldType.boolean},
    isBoolean: {type: FieldType.boolean},
    toDate: {type: FieldType.date},
};

export const validatorOptions = Object
    .keys(validators)
    .filter(key => typeof validators[key] === 'function')
    .reduce((acc, key) => {
        acc[key] = (...options) => ({
            ...(isTransformerName(key)
                ? createTransformerMeta(validators[key], options)
                : createValidatorMeta(validators[key], options)),
            ...(additionalTypeMeta[key] || {})
        });
        return acc;
    }, {});

export const mergeableOptions = [
    {from: ['toString'], to: 'string'},
    {from: ['isInt', 'toInt'], to: 'int'},
    {from: ['isFloat', 'toFloat'], to: 'float'},
    {from: ['isBoolean', 'toBoolean'], to: 'boolean'},
    {from: ['toDate'], to: 'date'},
];

const mergeMetaFns = (options, fns) => mergeMeta(...fns.map(fn => fn(...options)));

const shortCutOptions = mergeableOptions.reduce((acc, {from, to}) => {
    acc[to] = (...options) => mergeMetaFns(options, from.map(key => validatorOptions[key]));
    return acc;
}, {});

export interface ChainOptions {
    [key: string]: (...args: any[]) => object;
}
export const options: ChainOptions = {
    ...validatorOptions,
    ...shortCutOptions,
    opt: () => ({
        isOptional: true,
    }),
    description: (description) => ({
        description,
    }),
    optional: () => ({
        isOptional: true,
    }),
    array: () => ({
        isArray: true,
    }),
    sub: (...args) => ({
        type: FieldType.object,
        ...(getMeta(args))
    }),
    object: (...args) => ({
        type: FieldType.object,
        ...(getMeta(args))
    }),
};

