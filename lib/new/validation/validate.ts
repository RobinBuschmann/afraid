import {toArray} from '../utils';

export const validate = (options, objectOrObjects) => {
    const results: any[] = [];
    toArray(objectOrObjects)
        .forEach((object) => {
            options.forEach(({field, isOptional, validators, fields}) => {
                let value = object[field];
                const values = toArray(value);
                if (value !== undefined) {
                    if (fields) {
                        results.push(...validate(fields, values));
                        return;
                    }
                    values.forEach(value =>
                        (validators || []).forEach(validator => {
                            const result = validator(value, field);
                            if (result) results.push(result);
                        }),
                    );
                    return;
                }
                if (!isOptional) {
                    results.push({msg: `Field "${field}" is missing`});
                }
            }, [])
        });
    return results;
};
