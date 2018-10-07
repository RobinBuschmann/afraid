import {map} from './utils';

export const transform = (options, objectOrObjects) =>
    map(objectOrObjects, ((object) =>
        options.reduce((copy, {field, type, isArray, transformer, sub}) => {
            const value = isArray && !Array.isArray(object[field])
                ? [object[field]]
                : object[field];
            if (object[field] !== undefined) {
                copy[field] = sub
                    ? transform(sub, value)
                    : map(value, transformer)
                ;
            }
            return copy;
        }, {...object})),
    );