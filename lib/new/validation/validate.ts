import {toArray} from '../utils';

export const validate = (options, objectOrObjects) => {
    const results: any[] = [];
    toArray(objectOrObjects)
        .forEach((object) => {
            options.forEach(({field, isOptional, validators, sub, classObject}) => {
                let value = object[field];
                const values = toArray(value);
                if (value !== undefined) {
                    if (sub) {
                        results.push(...validate(sub, values));
                        return;
                    }
                    values.forEach(value =>
                        validators.forEach(validator => {
                            const result = validator(value);
                            if(result) results.push(result);
                        }),
                    );
                    return;
                }
                if (!isOptional) {
                    results.push({msg: `"${field}" is missing`});
                }
            }, [])
        });
    return results;
};