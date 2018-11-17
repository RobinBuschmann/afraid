import * as ClassTransformer from 'class-transformer';

let classTransformer: typeof ClassTransformer | undefined;

export const getClassTransformer = () => {
    if (!classTransformer) {
        require('reflect-metadata');
        classTransformer = require('class-transformer') as typeof ClassTransformer;
    }
    return classTransformer;
};