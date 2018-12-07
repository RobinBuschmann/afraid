import {ChainOptions, options} from '../options';
import {mergeMeta} from '../meta-utils';

export const createChain = (chainOptions: ChainOptions = options) => Object
    .keys(chainOptions)
    .reduce((chain, name) => {
        chain[name] = function(...args: any[]) {
            this.meta = mergeMeta(this.meta, chainOptions[name](...args));
            return this;
        };
        return chain;
    }, {});

