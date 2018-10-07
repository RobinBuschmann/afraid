import {toArray} from './utils';

export const validate = (options, objectOrObjects) => toArray(objectOrObjects)
    .reduce((results, object) => [
        ...results,
        ...(options.reduce((results, {field, isOptional, validator, sub}) => {
            let value = object[field];
            const values = toArray(value);
            if (value !== undefined) {
                if (sub) {
                    return [...results, ...validate(sub, values)];
                }
                return [...results, ...values
                    .map(validator)
                    .filter(result => result)]
            }
            if (!isOptional) {
                return [...results, {msg: `"${field}" is missing`}];
            }
        }, [])),
    ], []);