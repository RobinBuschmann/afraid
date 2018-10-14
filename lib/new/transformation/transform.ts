import {map} from '../utils';

export const transform = (options, objectOrObjects) =>
    map(objectOrObjects, ((object) =>
        options.reduce((copy, {field, type, isArray, transformers, sub}) => {
            const value = isArray && !Array.isArray(object[field])
                ? [object[field]]
                : object[field];
            if (object[field] !== undefined) {
                copy[field] = sub
                    ? transform(sub, value)
                    : map(value, targetValue => transformers
                        .reduce((transformedValue, transformer) =>
                            transformer(transformedValue), targetValue))
                ;
            }
            return copy;
        }, {...object})),
    );