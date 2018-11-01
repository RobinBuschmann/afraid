import {IRouterMatcher, PathParams} from "express-serve-static-core";
import {Chain} from './meta/functional/chain';
import {TRequestHandler} from './middlwares/request-handler';

declare module 'express-serve-static-core' {

    export interface IRouterMatcher<T> {

        <R1 extends {}, R2 extends {}, R3 extends {}>(path: PathParams, transformers: [Chain<R1>, Chain<R2>, Chain<R3>], handler: TRequestHandler<R1 & R2 & R3>): T;
        <R1 extends {}, R2 extends {}>(path: PathParams, transformers: [Chain<R1>, Chain<R2>], handler: TRequestHandler<R1 & R2>): T;

        <R1 extends {}>(path: PathParams, transformers: [Chain<R1>], handler: TRequestHandler<R1>): T;
    }

}
