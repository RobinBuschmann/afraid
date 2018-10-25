import * as validators from "validator";
import {isTransformerName} from '../transformation/utils';
import {isValidatorName} from '../validation/utils';
import {FieldType} from './field-type';
import {extractMeta, mergeMeta} from './meta-utils';

export const transformerOptions = Object
    .keys(validators)
    .filter(key => typeof validators[key] === 'function')
    .filter(isTransformerName)
    .reduce((acc, key) => {
        acc[key] = options => ({
            transformers: [v => validators[key](v, ...options)],
        });
        return acc;
    }, {});

export const validatorOptions = Object
    .keys(validators)
    .filter(key => typeof validators[key] === 'function')
    .filter(isValidatorName)
    .reduce((acc, key) => {
        acc[key] = options => ({
            validators: [v => validators[key](v, ...options)],
        });
        return acc;
    }, {});

const string = () => ({type: FieldType.string, transformers: [validators.toString]});

const date = () => ({type: FieldType.date, transformers: [validators.toDate]});

const floatType = () => ({type: FieldType.float});
const floatTransformer = () => ({transformers: [validators.toFloat]});
const floatValidator = (options) => ({validators: [v => validators.isFloat(v, options)]});

const booleanType = () => ({type: FieldType.boolean});
const booleanTransformers = (strict) => ({transformers: [v => validators.toBoolean(v, strict)]});
const booleanValidators = () => ({validators: [validators.isBoolean],});

const intType = () => ({type: FieldType.int});
const intTransformer = (radix) => ({transformers: [v => validators.toInt(v, radix)]});
const intValidator = (radix) => ({validators: [v => validators.isInt(v, radix)]});

const mergeMetaFns = (options, ...fns) => mergeMeta(...fns.map(fn => fn(options)));

export const options = {
    ...transformerOptions,
    ...validatorOptions,

    string,
    toString: string,

    date,
    toDate: date,

    float: options => mergeMetaFns(options, floatType, floatValidator, floatTransformer),
    toFloat: options => mergeMetaFns(options, floatType, floatTransformer),
    isFloat: options => mergeMetaFns(options, floatType, floatValidator),

    boolean: options => mergeMetaFns(options, booleanType, booleanTransformers, booleanValidators),
    toBoolean: options => mergeMetaFns(options, booleanType, booleanTransformers),
    isBoolean: options => mergeMetaFns(options, booleanType, booleanValidators),

    int: options => mergeMetaFns(options, intType, intTransformer, intValidator),
    toInt: options => mergeMetaFns(options, intType, intTransformer),
    isInt: options => mergeMetaFns(options, intType, intValidator),

    opt: () => ({
        isOptional: true,
    }),
    optional: () => ({
        isOptional: true,
    }),
    array: () => ({
        isArray: true,
    }),
    sub: (...fields) => ({
        type: FieldType.object,
        fields: fields.map(extractMeta),
    }),
    object: (...fields) => ({
        type: FieldType.object,
        fields: fields.map(extractMeta),
    }),
};

