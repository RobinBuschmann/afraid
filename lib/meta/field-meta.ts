import {FieldType} from './field-type';

export interface FieldMeta {
    field: string;
    type: FieldType,
    description?: string,
    transformers?: Array<Function>;
    validators?: Array<Function>;
    isArray?: boolean;
    isOptional?: boolean;
    fields?: FieldMeta[];
    classRef?: any;
    nthOneOfMany?: number;
}