export interface TransformerMeta {
    field: string;
    target: string;
    type: string | object;
    isArray?: boolean;
    isOptional?: boolean;
}

export const metadata = (meta: Partial<TransformerMeta>, chain?: object & { transformer? }) => ({
    transformer: {
        ...(chain || {}).transformer || {},
        ...meta,
    },
});
