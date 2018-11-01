import 'reflect-metadata';
import {FieldType} from '../field-type';
import {mergeMeta} from '../meta-utils';
import {plainToClass} from 'class-transformer';

const META_KEY = 'express-transformer:fields';
const typeMap = new Map<object, string>([
    [String, FieldType.string],
    [Boolean, FieldType.boolean],
    [Date, FieldType.date],
]);
/**
 * Map to resolve circular dependencies
 */
const classFieldsMetaMap = new WeakMap<object, Array<any>>();

export const getAllFieldMeta = target =>
    Reflect.getMetadata(META_KEY, target) || {};

export const setFieldMeta = (target, field, fieldMeta) => {
    const currentMeta = getAllFieldMeta(target);
    const currentFieldMeta = currentMeta[field] || {};
    Reflect.defineMetadata(META_KEY, {
        ...currentMeta,
        [field]: mergeMeta(currentFieldMeta, fieldMeta),
    }, target);
};

export const resolveFieldMeta = target => {
    const resolve = target => {
        const allFieldMeta = getAllFieldMeta(target.prototype);
        const fieldsMeta = [];
        classFieldsMetaMap.set(target, fieldsMeta);
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
                        fields: classFieldsMetaMap.has(typeObject)
                            ? classFieldsMetaMap.get(typeObject)
                            : resolve(typeObject),
                    });
                }
                return acc;
            }, fieldsMeta as any)
    };
    return {
        transformers: [v => plainToClass(target, v)],
        fields: resolve(target),
    }
};
