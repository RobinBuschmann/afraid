
export const map = (value, callbackFn) => Array.isArray(value)
    ? value.map(callbackFn)
    : callbackFn(value);

export const toArray = value => Array.isArray(value)
    ? value
    : [value];

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.substr(1, value.length);

export type SetType<T, TYPE> = { [P in keyof T]: TYPE; };
export type Partialize<T> = { [P in keyof T]: Partial<T[P]>; };

export type Arrayfy<T> = { [P in keyof T]: Array<T[P]>; };