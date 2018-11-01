import {options as chainOptions} from '../options';
import {mergeMeta} from '../meta-utils';

export const createChain = (filter?) => Object
    .keys(chainOptions)
    .filter(name => !filter || filter.indexOf(name) !== -1)
    .reduce((chain, name) => {
        chain[name] = function(...args: any[]) {
            this.meta = mergeMeta(this.meta, chainOptions[name](...args));
            return this;
        };
        return chain;
    }, {});

