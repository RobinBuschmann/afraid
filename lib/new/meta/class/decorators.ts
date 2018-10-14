import {options, transformerOptions, validatorOptions} from '../options';
import {capitalize} from '../../utils';
import {getFieldMeta, setFieldMeta} from './field-meta';

const inferredOptions = Object
    .keys(options)
    .filter(key => ['array', 'string', 'date', 'boolean'].indexOf(key) !== -1)
    .reduce((acc, key) => acc[key] = options[key] || acc, {});

const createDecorators = (options, fieldMetaTargetKey, fieldMetaCreatorFnKey) => Object.keys(options)
    .forEach(key => exports[capitalize(key)] = (...args: any[]) =>
        (target, field) => {
            const create = options[key][fieldMetaCreatorFnKey];
            const fieldMeta = getFieldMeta(target)[field] || {[fieldMetaTargetKey]: []};
            setFieldMeta(target, field, {[fieldMetaTargetKey]: [...fieldMeta[fieldMetaTargetKey], create(...args)]})
        },
    );

export const Optional = (target, key) => setFieldMeta(target, key, {isOptional: true});

createDecorators(transformerOptions, 'transformers', 'createTransformer');
createDecorators(validatorOptions, 'validators', 'createValidator');
