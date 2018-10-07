const chainOptions = {
    string: {
        type: 'string',
        transformer: v => v,
        validator: v => v,
    },
    date: {
        type: 'date',
        transformer: v => v,
        validator: v => v,
    },
    int: {
        type: 'integer',
        transformer: v => v,
        validator: v => v,
    },
    float: {
        type: 'float',
        transformer: v => v,
        validator: v => v,
    },
    boolean: {
        type: 'boolean',
        transformer: v => v,
        validator: v => v,
    },
    sub: {
        type: 'object',
    },
    opt: {
        isOptional: true,
    },
    array: {
        isArray: true,
    }
};

export const createChain = (filter?) => Object
    .keys(chainOptions)
    .filter(name => !filter || filter.indexOf(name) !== -1)
    .reduce((chain, name) => {
        chain[name] = function(...args: any[]) {
            const subMeta =  args.length ? {sub: args.map(extractMeta)} : {};
            this.meta = {...this.meta, ...chainOptions[name], ...subMeta};
            return this;
        };
        return chain;
    }, {});

export const extractMeta = ({meta}) => meta;
