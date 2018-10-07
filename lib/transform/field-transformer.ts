import {metadata} from '../metadata';

const setMetadata = (context, data) => Object.assign(context, metadata(data, context));

const transformers = {
    string: {
        validator: context => context,
        transformer: context => context.customSanitizer(value => value),
        metadata: context => setMetadata(context, {type: 'string'}),
    },
    opt: {
        validator: context => context,
        transformer: context => context.optional(),
        metadata: context => setMetadata(context, {isOptional: true}),
    },
    float: {
        validator: context => context.isFloat(),
        transformer: context => context.toFloat(),
        metadata: context => setMetadata(context, {type: 'float'}),
    },
    int: {
        validator: context => context.isInt(),
        transformer: context => context.toInt(),
        metadata: context => setMetadata(context, {type: 'integer'}),
    },
    boolean: {
        validator: context => context.isBoolean(),
        transformer: context => context.toBoolean(),
        metadata: context => setMetadata(context, {type: 'boolean'}),
    },
    date: {
        validator: context => context,
        transformer: context => context.toDate(),
        metadata: context => setMetadata(context, {type: 'date'}),
    },
    array: {
        validator: context => context,
        transformer: context => context.customSanitizer(value => Array.isArray(value) ? value : [value]),
        metadata: context => setMetadata(context, {isArray: true}),
    },
};

export const createBase = (actions = ['validator', 'transformer', 'metadata'], filter?) =>
    Object.keys(transformers).reduce((acc, name) => {
        const options = transformers[name];
        if (!filter || filter.indexOf(name) !== -1) {
            acc[name] = function() {
                actions.forEach(action => options[action](this));
                return this;
            };
        }
        return acc;
    }, {});
