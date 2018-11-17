import * as express from 'express';
import {query, params, body, f, fail} from '../../';

const app = express();

// Should infer types correctly
app.post('/', [
    params(f('id').int()),
    query(f('retries').int().opt()),
    body(f('name').string()),
    fail,
], (req, res, next) => {

    // $ExpectType number
    req.params.id;

    // $ExpectType number | undefined
    req.query.retries;

    // $ExpectType string
    req.body.name;
});
