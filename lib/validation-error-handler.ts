import {validationResult} from 'express-validator/check';
import {TransformerHandler} from './transformer-handler';

export const fail: TransformerHandler<{}> = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (e) {
        next(Object.assign(e, {statusCode: 400}));
    }
};
