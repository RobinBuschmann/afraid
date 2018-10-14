import {options as chainOptions} from '../options';

export const createChain = (filter?) => Object
    .keys(chainOptions)
    .filter(name => !filter || filter.indexOf(name) !== -1)
    .reduce((chain, name) => {
        chain[name] = function(...args: any[]) {
            const subMeta =  args.length ? {sub: args.map(extractMeta)} : {};
            const {createValidator, createTransformer, ...options} = chainOptions[name];
            const validator = createValidator && createValidator(...args);
            const transformer = createTransformer && createTransformer(...args);
            const thisMeta = this.meta || {};
            this.meta = {
                ...thisMeta,
                ...options,
                ...subMeta,
                validators: [...(thisMeta.validators || []), validator]
                    .filter(v => v),
                transformers: [...(thisMeta.transformers || []), transformer]
                    .filter(t => t),
            };
            return this;
        };
        return chain;
    }, {});

export const extractMeta = ({meta}) => meta;
