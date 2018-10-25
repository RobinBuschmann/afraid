import 'reflect-metadata';
import {FieldType} from '../field-type';
import {mergeMeta} from '../meta-utils';

const META_KEY = 'express-transformer:fields';

export const getAllFieldMeta = target =>
    Reflect.getMetadata(META_KEY, target) || {};

export const setFieldMeta = (target, field, fieldMeta) => {
    const currentMeta = getAllFieldMeta(target);
    const currentFieldMeta = currentMeta[field] || {};
    Reflect.defineMetadata(META_KEY, {
        ...currentMeta,
        [field]: mergeMeta(currentFieldMeta, fieldMeta)
    }, target);
};

export const resolveFieldMeta = target => {
    const allFieldMeta = getAllFieldMeta(target.prototype);
    return Object.keys(allFieldMeta)
        .reduce((acc, field) => {
            const {typeFn, ...options} = allFieldMeta[field];
            const typeObject = typeFn();
            const type = typeMap.get(typeObject) || options.type;
            if (typeof type === 'string') {
                acc.push({type, ...options});
            } else {
                acc.push({
                    ...options,
                    type: FieldType.object,
                    fields: resolveFieldMeta(typeObject),
                });
            }
            return acc;
        }, [] as any);
};

const typeMap = new Map<object, string>([
    [String, FieldType.string],
    [Boolean, FieldType.boolean],
    [Date, FieldType.date],
]);