import * as validators from "validator";
import {isTransformerName} from '../transformation/utils';
import {isValidatorName} from '../validation/utils';
import {Type} from './type';

export const transformerOptions = Object
    .keys(validators)
    .filter(key => typeof validators[key] === 'function')
    .filter(isTransformerName)
    .reduce((acc, key) => {
        acc[key] = {createTransformer: options => v => validators[key](v, ...options)};
        return acc;
    }, {});

export const validatorOptions = Object
    .keys(validators)
    .filter(key => typeof validators[key] === 'function')
    .filter(isValidatorName)
    .reduce((acc, key) => {
        acc[key] = {createValidator: options => v => validators[key](v, ...options)};
        return acc;
    }, {});

export const options = {
    ...transformerOptions,
    ...validatorOptions,
    string: {
        type: Type.string,
        createTransformer: () => v => validators.toString(v),
    },
    date: {
        type: Type.date,
        createTransformer: () => v => validators.toDate(v),
    },
    int: {
        type: Type.int,
        createTransformer: options => v => validators.toInt(v, ...options),
        createValidator: options => v => validators.isInt(v, ...options),
    },
    float: {
        type: Type.float,
        createTransformer: v => v,
        createValidator: v => v,
    },
    boolean: {
        type: Type.boolean,
        createTransformer: v => v,
        createValidator: v => v,
    },
    sub: {
        type: Type.object,
    },
    opt: {
        isOptional: true,
    },
    array: {
        isArray: true,
    },
};
