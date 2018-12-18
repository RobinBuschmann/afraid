import {body} from '../../lib/middlewares/middlwares';
import {f} from '../../lib/meta/functional/field';
import {Application, RequestHandler} from 'express';
import {SinonSpy, spy} from 'sinon';
import {expect} from 'chai';
import * as request from 'supertest';
import express = require('express');
import {json} from 'body-parser';
import {oneOf} from '../../lib/middlewares/one-of';

describe('integration.oneOf', () => {

    let app: Application;
    let handler: SinonSpy;

    beforeEach(() => {
        app = express();
        app.use(json());
        handler = spy((req, res, next) => res.sendStatus(200));
        app.post('/users',
            [
                oneOf(
                    body(
                        f('name').string(),
                    ),
                    body(
                        f('age').int(),
                    ),
                ),
            ], handler as RequestHandler);
    });

    it('should reset validation errors since one of is valid (and parse params properly)', async () => {
        await request(app)
            .post('/users')
            .send({name: 'test'});
        let [req] = handler.firstCall.args;
        expect(req.validationErrors).to.have.lengthOf(0);
        expect(req.body.name).to.eql('test');

        handler.resetHistory();

        await request(app)
            .post('/users')
            .send({age: '1'});
        [req] = handler.firstCall.args;
        expect(req.validationErrors).to.have.lengthOf(0);
        expect(req.body.age).to.eql(1);
    });

    it('should set validationErrors since no one is valid', async () => {
        await request(app)
            .post('/users');

        const [req] = handler.firstCall.args;

        expect(req.validationErrors).to.have.lengthOf(2);

    });

});