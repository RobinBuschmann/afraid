import {NextFunction, Request, Response} from 'express-serve-static-core';
import {IncomingHttpHeaders} from "http";

export interface StrictRequest extends Request {
    body: {};
    cookies: {};
    headers: {} & IncomingHttpHeaders;
    params: {};
    query: {};
}

export interface StrictResponse<B> extends Response {
    send: (body: B) => StrictResponse<B>;
    json: (body: B) => StrictResponse<B>;
    jsonp: (body: B) => StrictResponse<B>;
}

export interface RequestHandler<R, S = any> {
    (req: R & StrictRequest, res: StrictResponse<S>, next: NextFunction): any;
}