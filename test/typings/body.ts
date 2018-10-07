import * as express from 'express';
import {body, fail} from '../../';
import {response} from '../../lib/response';

const app = express();

// Per field
// --------------------

// Should infer types correctly
app.post('/', [
    body('name').string().opt(),
    body('birthday').date(),
    body('email').string().isEmail(),
    body('nicknames').string().array(),
    fail,
], (req, res, next) => {

    // $ExpectType string | undefined
    req.body.name;

    // $ExpectType Date
    req.body.birthday;

    // $ExpectType string
    req.body.email;

    // $ExpectType string[]
    req.body.nicknames;
});

// Per class
// --------------------

class User {
    name: string;
    birthday: Date;
    email: string;
}

// Should infer types correctly
app.post('/', [
        body('name').string().opt(),
    ],
    [
        response('name').string().array(),
    ], (req, res, next) => {

        // $ExpectType string | undefined
        req.body.name;

        res.send({name: [true]});

    });

// Should infer types correctly
app.post('/', [
    body(User),
    fail,
], (req, res, next) => {

    // $ExpectType string
    req.body.name;

    // $ExpectType Date
    req.body.birthday;

    // $ExpectType string
    req.body.email;
});

// Should infer types correctly for arrays
app.post('/', [
    body(User).array(),
    fail,
], (req, res, next) => {

    // $ExpectType string
    req.body[0].name;

    // $ExpectType Date
    req.body[0].birthday;

    // $ExpectType string
    req.body[0].email;
});
