
export const map = (value, callbackFn) => Array.isArray(value)
    ? value.map(callbackFn)
    : callbackFn(value);

export const toArray = value => Array.isArray(value)
    ? value
    : [value];

export const flatten = <T>(arr: T[][]) => ([] as T[]).concat(...arr);

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.substr(1, value.length);
