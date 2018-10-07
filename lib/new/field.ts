import {Arrayfy, SetType} from '../utils';
import {createChain} from './chain';

export interface FieldChain<OBJ extends {}> {
    date(): FieldChain<SetType<OBJ, Date>>
    float(): FieldChain<SetType<OBJ, number>>
    int(): FieldChain<SetType<OBJ, number>>
    string(): FieldChain<SetType<OBJ, string>>
    boolean(strict?: boolean): FieldChain<SetType<OBJ, boolean>>
    array(): FieldChain<Arrayfy<OBJ>>;
    opt(): FieldChain<Partial<OBJ>>;
    sub: Sub<OBJ>;
}

interface Sub<OBJ> {
    <SUB>(chain: FieldChain<SUB>): FieldChain<SetType<OBJ, SUB>>;
    <S1, S2>(chain1: FieldChain<S1>, chain2: FieldChain<S2>): FieldChain<SetType<OBJ, S1 & S2>>;
    <S1, S2, S3>(chain1: FieldChain<S1>, chain2: FieldChain<S2>, chain3: FieldChain<S3>): FieldChain<SetType<OBJ, S1 & S2 & S3>>;
}

const chain = createChain();

export const field = <F extends string>(name: F): FieldChain<{ [X in F] }> =>
    Object.assign(Object.create(chain), {meta: {field: name}});

export const f = field;