import {validationResult} from 'express-validator/check';
import {createServer} from "http";
import * as express from 'express';
import {json} from 'body-parser';
import {body, param, query} from './lib/transformer';

const app = express();

class User {
    name: string;
    age: number;
}

app.use(json());

app.post('/users/:id',
    [
        param('id').int(),
        query('limit').int().opt(),
        query('filters').string().array().opt(),
        query('test'),
        body(User),
    ],
    (req, res, next) => {
        try {
            const result = validationResult(req);
            result.throw();
            // res.send(validationResult(req));
            res.send({query: req.query, params: req.params, body: req.body});
            // res.send(req.body[0].age);
        } catch (e) {
            next(e);
        }
    },
);

createServer(app).listen(8000, () => console.log('Server running....'));