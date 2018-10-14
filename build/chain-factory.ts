import {writeFileSync} from 'fs';
import {join} from 'path';
import * as validators from "validator";

const COUNT = 20;
const FILE_PATH = join(__dirname, '..', 'lib', 'new', 'meta', 'functional', 'chain.ts');

const template = genericCount => `import {Arrayfy, SetType} from '../../utils';

export interface Chain<OBJ extends {}> {
    date(): Chain<SetType<OBJ, Date>>
    float(): Chain<SetType<OBJ, number>>
    int(): Chain<SetType<OBJ, number>>
    string(): Chain<SetType<OBJ, string>>
    boolean(strict?: boolean): Chain<SetType<OBJ, boolean>>
    array(): Chain<Arrayfy<OBJ>>;
    opt(): Chain<Partial<OBJ>>;
    sub: ChainBundler<OBJ>;
    ${Object.keys(validators)
        .filter(key => typeof validators[key] === 'function')
        .map(key => `
    ${key}(): Chain<OBJ>;`).join('')}
}

interface ChainBundler<OBJ> {${map(genericCount, i => `
    <${map(i, j => `S${j}`).join()}>(${map(i, j=> `chain${j}: Chain<S${j}>`).join()}): Chain<SetType<OBJ, ${map(i, j => `S${j}`).join('&')}>>`).join('')}
}
`;
const map = (count, iteratee) => {
    let i = 1;
    let values: string[] = [];
    while (i <= count) {
        values.push(iteratee(i));
        i++;
    }
    return values
};

writeFileSync(FILE_PATH, template(COUNT));

Object.keys(validators)
    .filter(key => typeof validators[key] === 'function')
.forEach(key => console.log(key, validators[key].length));