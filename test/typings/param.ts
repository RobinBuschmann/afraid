import * as express from 'express';
import {params, f, fail} from '../../';

const app = express();

// Should infer types correctly
app.post('/', [
    params(f('id').int()),
    fail,
], (req, res, next) => {

    // $ExpectType number
    req.params.id;

    // $ExpectError Property 'doesNotExist' does not exist on type 'SetType<{ id: any; }, number>'.
    req.params.doesNotExist;
});
