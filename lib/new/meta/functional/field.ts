import {createChain} from './chain-creator';
import {Chain} from './chain';

export type FieldChain<T extends {}> = Chain<T>;

const chain = createChain();

export const field = <F extends string>(name: F): FieldChain<{ [X in F] }> =>
    Object.assign(Object.create(chain), {meta: {field: name}});

export const f = field;
