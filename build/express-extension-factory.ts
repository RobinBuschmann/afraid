import {writeFileSync} from 'fs';
import {join} from 'path';

const COUNT = 15;
const FILE_PATH = join(__dirname, '..', 'lib', 'express-extension.d.ts');

const template = count => `
import {IRouterMatcher, PathParams, RequestHandlerParams} from "express-serve-static-core";
import {Middleware} from './middlewares/middlwares';
import {TRequestHandler} from './middlewares/request-handler';

declare module 'express-serve-static-core' {

    export interface IRouterMatcher<T> {
    
        ${map(count, i => `${routerMatcherFnTemplate(count, i - 1)}`).join('')}
    
    }
    
}
`;

const routerMatcherFnTemplate = (fnCount, normalHandlersCount) => map(fnCount, innerCount => `
            <${map(innerCount, i => `R${i} extends {}`).join(',')}>
            (path: PathParams,
            ${map(normalHandlersCount, i => `h${i}: RequestHandlerParams`).map(v => `${v},`).join('')}
            transformers: [
                ${map(innerCount, i => `Middleware<R${i}>`).join(',')}
            ],
            handler: TRequestHandler<${map(innerCount, i => `R${i}`).join(' & ')}>): T;
        `).reverse().join('\n');

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