import {options as chainOptions} from '../options';
import {capitalize} from '../../utils';
import {setFieldMeta} from './field-meta';

export const createDecorators = () => Object.keys(chainOptions)
    .reduce((decorators, option) => {
        decorators[capitalize(option)] = (...args: any[]) =>
            (target, field) => {
                setFieldMeta(target, field, chainOptions[option](...args))
            };
        return decorators;
    }, {});