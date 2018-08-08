import * as express from 'express';
import {param, fail} from '../../';

const app = express();

// Should infer types correctly
app.post('/', [
    param('id').int(),
    fail,
], (req, res, next) => {

    // $ExpectType number
    req.params.id;

    // $ExpectError Property 'doesNotExist' does not exist on type 'SetType<{ id: string; }, number>'.
    req.params.doesNotExist;
});
