import {writeFileSync} from 'fs';
import {join} from 'path';

const maxNormalRequestHandlers = 5;
const maxReqMiddlewares = 8;
const FILE_PATH = join(__dirname, '..', 'lib', 'express-extension.d.ts');

const template = () => `
import {IRouterMatcher, PathParams, RequestHandlerParams} from "express-serve-static-core";
import {Middleware} from './middlewares/middlwares';
import {TRequestHandler} from './middlewares/request-handler';

declare module 'express-serve-static-core' {

    export interface IRouterMatcher<T> {
    
        ${map(maxReqMiddlewares,
    i => `${map(maxNormalRequestHandlers,
        j => `
            <${map(i, ii => `Req${ii} extends {}`).join(',')}>
            (path: PathParams,
            ${j ? map(j - 1, jj => `h${jj}: RequestHandlerParams`).map(v => `${v},`).join('') : ''}
            middlewares: [${map(i, ii => `Middleware<Req${ii}>`).join(',')}],
            handler: TRequestHandler<${map(i, ii => `Req${ii}`).join(' & ')}>): T;
        `).join('')}`).join('')}
    
    }
    
}
`;

const map = (count, iteratee) => {
    let i = 0;
    let values: string[] = [];
    while (i <= count) {
        values.push(iteratee(i));
        i++;
    }
    return values
};

writeFileSync(FILE_PATH, template());