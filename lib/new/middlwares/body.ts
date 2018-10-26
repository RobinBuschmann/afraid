import {createMiddleware} from './middleware-factory';
import {ChainBundler} from '../meta/functional/chain';

interface Handler {
    (...a: object[]);
}
type Body = ChainBundler<{}> & Handler;


export const body: Body = createMiddleware('body') as any;
