///<reference path="lib/express-extension.d.ts"/>

import * as express from 'express';
import {body} from './lib/middlwares/middlwares';
import {f} from './lib/meta/functional/field';

export * from './lib/middlwares/middlwares';
export * from './lib/meta/functional/field';
export * from './lib/meta/class/field';
export * from './lib/meta/class/decorators';


const app = express();

app.post('/test', [
    body(
        f('test')
    ),
], (req, res, next) => {
});