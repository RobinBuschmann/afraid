import {validationResult} from 'express-validator/check';
import {createServer} from "http";
import * as express from 'express';
import {json} from 'body-parser';
import {IsInt, IsString} from 'class-validator';
import {body, cookie, header, param, query} from './lib/transformers';

const app = express();

class User {
    @IsString()
    name: string;
    @IsInt()
    age: number;
}

app.use(json());

app.post('/users/:id',
    [
        param('id'),
        query('limit').int().array().opt(),
        query('limit2').array(),
        query('filters').string().array(),
        query('test'),
        header('page'),
        cookie('yeah'),
        body('name').string(),
        body('age').int(),
        body(User).array().opt(),
    ],
    (req, res, next) => {
        try {
            const result = validationResult(req);
            result.throw();
            if(req.query.limit) {
                req.query.limit.map(t => t.toFixed(1));
            }
            res.send({
                query: req.query,
                params: req.params,
                headers: req.headers,
                cookies: req.cookies,
                body: req.body
            });
        } catch (e) {
            next(e);
        }
    },
);

createServer(app).listen(8000, () => console.log('Server running....'));