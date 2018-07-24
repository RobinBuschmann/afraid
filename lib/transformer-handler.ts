import {Response, Request, NextFunction} from 'express-serve-static-core';

export interface StrictRequest extends Request {
    query: {};
    params: {};
    body: {};
}

export interface TransformerHandler<R> {
    (req: R & StrictRequest, res: Response, next: NextFunction): any;
}