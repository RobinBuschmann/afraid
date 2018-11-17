import {createDecorators} from './decorators-factory';

const decorators = createDecorators();
Object.assign(exports, decorators);

// todo
export declare const ToInt;
export declare const IsInt;
export declare const IsFloat;
export declare const IsEmail;
export declare const Optional;