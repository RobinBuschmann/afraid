import * as express from 'express';
import {body, f, fail} from '../../';

const app = express();

// Per field
// --------------------

// Should infer types correctly
app.post('/', [
    body(
        f('name').string().opt(),
        f('birthday').date(),
        f('email').string().isEmail(),
        f('nicknames').string().array(),
    ),
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
