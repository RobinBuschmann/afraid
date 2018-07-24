import {IRouterMatcher, PathParams} from "express-serve-static-core";
import {Transformer} from './transformer';
import {TransformerHandler} from './transformer-handler';

declare module 'express-serve-static-core' {

    export interface IRouterMatcher<T> {
        <R1 extends {},
            R2 extends {},
            R3 extends {},
            R4 extends {},
            R5 extends {}>
        (path: PathParams,
         transformers: [Transformer<R1>, Transformer<R2>, Transformer<R3>, Transformer<R4>, Transformer<R5>],
         handler: TransformerHandler<R1 & R2 & R3 & R4 & R5>): T;

        <R1 extends {},
            R2 extends {},
            R3 extends {},
            R4 extends {}>
        (path: PathParams,
         transformers: [Transformer<R1>, Transformer<R2>, Transformer<R3>, Transformer<R4>],
         handler: TransformerHandler<R1 & R2 & R3 & R4>): T;

        <R1 extends {},
            R2 extends {},
            R3 extends {}>
        (path: PathParams,
         transformers: [Transformer<R1>, Transformer<R2>, Transformer<R3>],
         handler: TransformerHandler<R1 & R2 & R3>): T;

        <R1 extends {},
            R2 extends {}>
        (path: PathParams,
         transformers: [Transformer<R1>, Transformer<R2>],
         handler: TransformerHandler<R1 & R2>): T;

        <R1 extends {}>
        (path: PathParams,
         transformers: [Transformer<R1>],
         handler: TransformerHandler<R1>): T;
    }
}
