export const mergeMeta = (...metas) => metas.reduce((acc, meta) => {
    const transformers = [...(acc.transformers || []), ...(meta.transformers || [])];
    const transformersMeta = transformers.length ? {transformers} : {};
    const validators = [...(acc.validators || []), ...(meta.validators || [])];
    const validatorsMeta = validators.length ? {validators} : {};
    return {
        ...acc,
        ...meta,
        ...transformersMeta,
        ...validatorsMeta,
    };
}, {});

export const extractMeta = ({meta}) => meta;