import {transformerOptions, options} from '../meta/options';
import {capitalize} from '../utils';

const inferredOptions = Object
    .keys(options)
    .filter(key => ['array', 'string', 'date', 'boolean'].indexOf(key) !== -1)
    .reduce((acc, key) => acc[key] = options[key] || acc, {});

