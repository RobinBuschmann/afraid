import {getFromContainer, MetadataStorage, ValidationTypes, IsInt, IsOptional} from 'class-validator';
import {getFieldMeta} from '../meta/class/field';
import {Type} from '../meta/type';

const metadataStorage = getFromContainer(MetadataStorage);

const getMeta = target => getFieldMeta(target.prototype)
    .map(({typeFn, ...rest}) => {
        const isOptional = isOptionalByValidationData(target, rest.field);
        const typeObject = typeFn();
        const type = getType(target, typeObject, rest.field);
        if (typeof type === 'string') {
            return {...rest, type, isOptional};
        }
        return {
            ...rest,
            isOptional,
            type: Type.object,
            fields: getMeta(typeObject),
        };
    });

const typeMap = new Map<object, string>([
    [String, 'string'],
    [Boolean, 'boolean'],
    [Date, 'date'],
]);

const getType = (target, typeObject, field) => {
    if (typeObject === Number) {
        return (isIntByValidationData(target, field) ? Type.int : Type.float);
    }
    return typeMap.get(typeObject);
};

const isOptionalByValidationData = (target, key) => (!!metadataStorage.groupByPropertyName(
    metadataStorage
        .getTargetValidationMetadatas(target, undefined as any)
        .filter(({type}) => type === ValidationTypes.CONDITIONAL_VALIDATION))[key]);

const isIntByValidationData = (target, key) => (!!metadataStorage.groupByPropertyName(
    metadataStorage
        .getTargetValidationMetadatas(target, undefined as any)
        .filter(({type}) => type === ValidationTypes.IS_INT))[key]);
