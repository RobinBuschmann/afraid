import * as express from 'express';
import {oneOf, body, query, f, fail} from '../../';

const app = express();

// Per field
// --------------------

// Should infer types correctly
app.post('/', [
    oneOf(
        query(
            f('name').string(),
        ),
        query(
            f('age').int(),
        ),
    ),
    fail,
], (req, res, next) => {

    if ('name' in req.query) {
        // $ExpectType string
        req.query.name;

        // $ExpectError Property 'age' does not exist on type 'SetType<{ name: any; }, string>'.
        req.query.age
    }

    if ('age' in req.query) {
        // $ExpectType number
        req.query.age;

        // $ExpectError Property 'name' does not exist on type 'SetType<{ age: any; }, number>'.
        req.query.name;
    }
});

// Per class
// --------------------

class UserWithNickName {
    name: string;
    nickName: string;
}

class UserWithAge {
    name: string;
    age: number;
}

// Should infer types correctly
app.post('/', [
    oneOf(
        body(UserWithNickName),
        body(UserWithAge),
    ),
    fail,
], (req, res, next) => {

    // $ExpectType string
    req.body.name;

    if ('nickName' in req.body) {
        // $ExpectType string
        req.body.nickName;

        // $ExpectError Property 'age' does not exist on type 'UserWithNickName'.
        req.body.age
    }

    if ('age' in req.body) {
        // $ExpectType number
        req.body.age;

        // $ExpectError Property 'nickName' does not exist on type 'UserWithAge'.
        req.body.nickName;
    }
});
