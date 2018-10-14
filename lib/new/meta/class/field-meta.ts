import 'reflect-metadata';
import {Type} from '../type';

const META_KEY = 'express-transformer:fields';

export const getFieldMeta = target =>
    Reflect.getMetadata(META_KEY, target) || {};

export const setFieldMeta = (target, key, value) => {
    const currentMeta = getFieldMeta(target);
    Reflect.defineMetadata(META_KEY, {...currentMeta, [key]: {...currentMeta[key], ...value}}, target);
};

export const resolveFieldMeta = target => {
    const fieldMeta = getFieldMeta(target.prototype);
    Object.keys(fieldMeta)
        .reduce((acc, key) => {
            const {typeFn, ...options} = fieldMeta[key];
            const typeObject = typeFn();
            const type = getType(target, typeObject, options.field);
            if (typeof type === 'string') {
                acc.push({type, ...options});
            } else {
                acc.push({
                    ...options,
                    type: Type.object,
                    fields: resolveFieldMeta(typeObject),
                });
            }
            return acc;
        }, [] as any);
};

const typeMap = new Map<object, string>([
    [String, 'string'],
    [Boolean, 'boolean'],
    [Date, 'date'],
]);

const getType = (target, typeObject, field) => {
    // if (typeObject === Number) {
    //     return (isIntByValidationData(target, field) ? Type.int : Type.float);
    // }
    return typeMap.get(typeObject);
};