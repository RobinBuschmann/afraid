import {map} from '../utils';

export const transform = (options, objectOrObjects) =>
    map(objectOrObjects, (object =>
        options.reduce((copy, {field, type, isArray, transformers, fields}) => {
            if (object[field] !== undefined) {
                const value = isArray && !Array.isArray(object[field])
                    ? [object[field]]
                    : object[field];
                copy[field] = transformers
                    ? map(value, targetValue => (transformers || [])
                        .reduce((transformedValue, transformer) =>
                            transformer(transformedValue), targetValue))
                    : (fields
                        ? transform(fields, value)
                        : value)
                ;
            }
            return copy;
        }, {...object})),
    );