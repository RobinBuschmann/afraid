import 'reflect-metadata';
import {FieldType} from '../field-type';
import {mergeMeta} from '../meta-utils';
import {getClassTransformer} from './utils';
import {FieldMeta} from '../field-meta';

const META_KEY = 'afraid:fields';
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

export const resolveClassFieldMeta = target => {
    const resolve = target => {
        const allFieldMeta = getAllFieldMeta(target.prototype);
        const fields: FieldMeta[] = [];
        classFieldsMetaMap.set(target, fields);
        return Object.keys(allFieldMeta)
            .reduce((acc, field) => {
                const {typeFn, ...options} = allFieldMeta[field];
                const typeObject = typeFn();
                const type = typeMap.get(typeObject) || options.type;
                if (typeof type === 'string') {
                    acc.fields.push({type, ...options});
                } else {
                    acc.fields.push({
                        ...options,
                        type: FieldType.object,
                        fields: classFieldsMetaMap.has(typeObject)
                            ? classFieldsMetaMap.get(typeObject)
                            : resolve(typeObject),
                    });
                }
                return acc;
            }, {fields, classRef: target})
    };
    return {
        transformers: [v => getClassTransformer().plainToClass(target, v)],
        ...resolve(target),
    }
};
