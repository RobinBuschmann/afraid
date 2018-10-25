import {FieldType} from './field-type';

interface FieldMeta {
    field: string;
    type: FieldType,
    transformers?: Array<Function>;
    validators?: Array<Function>;
    isArray?: boolean;
    isOptional?: boolean;
    fields?: FieldMeta[];
}