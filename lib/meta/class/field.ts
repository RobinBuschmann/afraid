import 'reflect-metadata';
import {Type} from 'class-transformer';
import {setFieldMeta} from './field-meta';

export function Field(typeFn): PropertyDecorator;
export function Field(target, key): void;
export function Field(...args: any[]) {
    const decorate = (targetOrTypeFunction) => (target, field) => {
        const designType = Reflect.getMetadata('design:type', target, field);
        const typeFn = targetOrTypeFunction || (() => designType);
        Type(typeFn)(target, field);
        const isArrayMeta = Array === designType ? {isArray: true} : {};
        setFieldMeta(target, field, {field, typeFn, ...isArrayMeta});
    };
    if (args.length === 1) {
        const [typeFn] = args;
        return decorate(typeFn);
    }
    const [target, key] = args;
    decorate(undefined)(target, key);
}