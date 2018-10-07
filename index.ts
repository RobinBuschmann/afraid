///<reference path="lib/express-serve-static-core-extensions.d.ts"/>
export * from './lib/body-class-transformer';
export * from './lib/transformer-handler';
export * from './lib/transformer';
export * from './lib/transformers';
export * from './lib/validation-error-handler';
export {metadata} from './lib/metadata';
export {TransformerMeta} from './lib/metadata';
export {Arrayfy} from './lib/utils';
export {ArrayfyLayer1} from './lib/utils';
export {PartialLayer1} from './lib/utils';
export {SetType} from './lib/utils';
export {SetTypeLayer1} from './lib/utils';

/*

req[target][field] // value
req[target][field] // value


valueTransformer =>
    (req, res, next) =>
        valueTransformer(req, res)

 */
