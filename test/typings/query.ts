import * as express from 'express';
import {query, fail} from '../../';

const app = express();

// Should infer types correctly
app.post('/', [
    query('limit').int(),
    query('offset').int().opt(),
    query('filters').string().array().opt(),
    fail,
], (req, res, next) => {

    // $ExpectType number
    req.query.limit;

    // $ExpectType number | undefined
    req.query.offset;

    // $ExpectType string[] | undefined
    req.query.filters;
});
