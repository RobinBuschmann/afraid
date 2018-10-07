import {Validator} from 'express-validator/check';
import {Sanitizer} from 'express-validator/filter';
import {isInt} from 'validator';
import {BaseTransformer} from './transformer';

export type SetTypeLayer1<T, TYPE> = { [P in keyof T]: SetType<T[P], TYPE>; }
export type SetType<T, TYPE> = { [P in keyof T]: TYPE; };
export type PartialLayer1<T> = { [P in keyof T]: Partial<T[P]>; };
export type ArrayfyLayer1<T> = { [P in keyof T]: Arrayfy<T[P]>; };
export type Arrayfy<T> = { [P in keyof T]: Array<T[P]>; };

type Value<Key extends string, Type> = { [X in Key]: Type };

type ConditionalPartial<Target, Key extends string> = {
    [P in keyof Target]: P extends Key ? Target[P] | undefined : Target[P];
};
type ConditionalArrayfy<Target, Key extends string> = {
    [P in keyof Target]: P extends Key ? Array<Target[P]> : Target[P];
};
type SubValue<ParentKey extends string, Key extends string, Type> = { [K in ParentKey]: Value<Key, Type> }

const field = <F extends string>(name: F): FieldChain<{ [X in F] }> => ({}) as any;
const f = <F extends string>(name: F): FieldChain<{ [X in F] }> => ({}) as any;

const chainOptions = {
    date: {
        transformer: v => v,
        validator: v => v,
        meta: {type: 'date'},
    },
    int: {
        transformer: v => v,
        validator: v => v,
        meta: {type: 'integer'},
    },
    float: {
        transformer: v => v,
        validator: v => v,
        meta: {type: 'float'},
    },
    sub: {
        meta: {type: 'object'},
    },
};

export interface FieldChain<OBJ extends {}> extends Validator, Sanitizer {
    date(): FieldChain<SetType<OBJ, Date>>
    float(): FieldChain<SetType<OBJ, number>>
    int(): FieldChain<SetType<OBJ, number>>
    string(): FieldChain<SetType<OBJ, string>>
    boolean(strict?: boolean): FieldChain<SetType<OBJ, boolean>>
    array(): FieldChain<Arrayfy<OBJ>>;
    opt(): FieldChain<Partial<OBJ>>;
    sub: Sub<OBJ>;
    // field<F extends string>(name: F): FieldChain<TARGET, PREV & {[K2 in F]: string}>;
}

interface Sub<OBJ> {
    <SUB>(chain: FieldChain<SUB>): FieldChain<SetType<OBJ, SUB>>;
    <S1, S2>(chain1: FieldChain<S1>, chain2: FieldChain<S2>): FieldChain<SetType<OBJ, S1 & S2>>;
    <S1, S2, S3>(chain1: FieldChain<S1>, chain2: FieldChain<S2>, chain3: FieldChain<S3>): FieldChain<SetType<OBJ, S1 & S2 & S3>>;
}

interface BodyChain<OBJ> {
    array(): BodyChain<Array<OBJ>>;
    opt(): BodyChain<OBJ | undefined>;
}

interface Body {
    <T1>(chain: FieldChain<T1>): BodyChain<T1>;
    <T1, T2>(chain1: FieldChain<T1>, chain2: FieldChain<T2>): BodyChain<T1 & T2>;
    <T1, T2, T3>(chain1: FieldChain<T1>, chain2: FieldChain<T2>, chain3: FieldChain<T3>): BodyChain<T1 & T2 & T3>;
}

const bodyType = <B>(body: BodyChain<B>): B => ({} as any);

const body: Body = (...args: any[]) => {
    return {} as any;
};

interface ValidationResult {
    msg: string;
}

const map = (value, callbackFn) => Array.isArray(value)
    ? value.map(callbackFn)
    : callbackFn(value);
const toArray = value => Array.isArray(value)
    ? value
    : [value];

const validate = (options, objects) => objects.reduce((results, object) => [
    ...results,
    ...(options.reduce((results, {field, isOptional, validator, sub}) => {
        let value = object[field];
        const values = toArray(value);
        if (value !== undefined) {
            if (sub) {
                return [...results, ...validate(sub, values)];
            }
            return [...results, ...values
                .map(validator)
                .filter(result => result)]
        }
        if (!isOptional) {
            return [...results, {msg: `"${field}" is missing`}];
        }
    }, [])),
], []);
const transform = (options, objectOrObjects) => map(objectOrObjects, ((object) => {
    const copy = {...object};
    options.forEach(({field, type, isArray, transformer, sub}) => {
        const value = isArray && !Array.isArray(object[field]) ? [object[field]] : object[field];
        if (object[field] !== undefined) {
            copy[field] = sub
                ? transform(sub, value)
                : map(value, transformer)
            ;
        }
    });
    return copy;
}));

const options = [
    {
        field: 'age',
        validator: v => !isInt(v) ? {msg: `Bla`} : undefined,
        transformer: v => v,
    },
    {
        field: 'bla',
        validator: v => !isInt(v) ? {msg: `Bla`} : undefined,
        transformer: v => v,
    },
    {
        field: 'birthDate',
        validator: v => undefined,
        transformer: v => new Date(v),
    },
    {
        field: 'friends',
        isArray: true,
        sub: [{
            field: 'nickname',
            validator: v => v !== 'test' ? {msg: 'dadi'} : undefined,
            transformer: v => v,
        }],
    },
];
const res = validate(options, [
    {age: 'dfs', birthDate: new Date().toJSON(), friends: [{nickname: 'test2'}]},
]);

const val = transform(options, {age: 12, birthDate: new Date().toJSON(), friends: {nickname: 'test'}});

''
/*
app.post('/users,
    [body(
        field('name').string(),
        field('age').int(),
    )],
    response(
        field('id').int(),
        field('name').string(),
        field('age').int(),
    ),
    (req, res, next) => {

    }
);
 */


// const value = bodyType(
//     body(
//         f('name').string(),
//         f('age').int(),
//         f('friends').sub(
//             f('nickname').string(),
//             f('age').int(),
//             f('bestFriend').sub(
//                 f('likes').int(),
//             ),
//         ).array(),
//     ).opt(),
// );
//
// if (value) {
// }
