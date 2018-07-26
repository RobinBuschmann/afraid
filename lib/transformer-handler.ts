import {NextFunction, Request, Response} from 'express-serve-static-core';
import {IncomingHttpHeaders} from 'http';

export interface StrictRequest extends Request {
    body: {};
    cookies: {};
    headers: {} & IncomingHttpHeaders;
    params: {};
    query: {};
}

export interface TransformerHandler<R> {
    (req: R & StrictRequest, res: Response, next: NextFunction): any;
}
