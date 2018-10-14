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
        setFieldMeta(target, field, {field, typeFn, isArray: Array === designType});
    };
    if (args.length === 1) {
        const [typeFn] = args;
        return decorate(typeFn);
    }
    const [target, key] = args;
    decorate(undefined)(target, key);
}