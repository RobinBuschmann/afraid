import * as express from 'express';
import {query, f, fail} from '../../';

const app = express();

// Should infer types correctly
app.post('/', [
    query(
        f('limit').int(),
        f('offset').int().opt(),
        f('filters').string().array().opt(),
    ),
    fail,
], (req, res, next) => {

    // $ExpectType number
    req.query.limit;

    // $ExpectType number | undefined
    req.query.offset;

    // $ExpectType string[] | undefined
    req.query.filters;
});
