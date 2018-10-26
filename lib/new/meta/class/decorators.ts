import {createDecorators} from './decorators-creator';

const decorators = createDecorators();
Object.assign(exports, decorators);

export declare const ToInt;
export declare const IsInt;
export declare const IsFloat;
export declare const IsString;