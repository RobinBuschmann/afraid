import {writeFileSync} from 'fs';
import {join} from 'path';

const COUNT = 20;
const FILE_PATH = join(__dirname, '..', 'lib', 'express-serve-static-core-extensions.d.ts');

const template = count => `
import {IRouterMatcher, PathParams} from "express-serve-static-core";
import {Transformer} from './transformer';
import {TransformerHandler} from './transformer-handler';

declare module 'express-serve-static-core' {

    export interface IRouterMatcher<T> {
    
        ${map(count, innerCount => `
            <${map(innerCount, i => `R${i} extends {}`).join(',')}>
            (path: PathParams,
            transformers: [
                ${map(innerCount, i => `Transformer<R${i}>`).join(',')}
            ],
            handler: TransformerHandler<${map(innerCount, i => `R${i}`).join(' & ')}>): T;
        `).reverse().join('\n')}
    
    }
    
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