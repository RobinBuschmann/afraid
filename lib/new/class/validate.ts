import {validate as validateClass} from 'class-validator';
import {flatten, toArray} from '../utils';


export const validate = (transformedObjectOrObjects) =>
    Promise.all(toArray(transformedObjectOrObjects)
        .map(obj => validateClass(obj)))
        .then(flatten)
        .then(results => results.reduce((acc, {value, property, constraints}) => {
            Object.keys(constraints).forEach(key => acc.push({
                msg: constraints[key],
                field: property,
                value,
            }));
            return acc;
        }, [] as any[]))
;
