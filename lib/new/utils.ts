
export const map = (value, callbackFn) => Array.isArray(value)
    ? value.map(callbackFn)
    : callbackFn(value);

export const toArray = value => Array.isArray(value)
    ? value
    : [value];
