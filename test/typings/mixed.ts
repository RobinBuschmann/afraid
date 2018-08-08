import * as express from 'express';
import {query, fail, param, body} from '../../';

const app = express();

// Should infer types correctly
app.post('/', [
    param('id').int(),
    query('retries').int().opt(),
    body('name').string(),
    fail,
], (req, res, next) => {

    // $ExpectType number
    req.params.id;

    // $ExpectType number | undefined
    req.query.retries;

    // $ExpectType string
    req.body.name;
});
