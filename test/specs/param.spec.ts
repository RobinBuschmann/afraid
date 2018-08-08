import * as express from 'express';
import {Application, RequestHandler} from 'express';
import {expect, use} from 'chai';
import * as request from 'supertest';
import * as sinonChai from 'sinon-chai';
import {SinonSpy, spy} from 'sinon';
import {json} from 'body-parser';
import {param} from '../../';
import {fail} from '../../lib/validation-error-handler';

use(sinonChai);

describe('param', () => {

    let app: Application;
    let handler: SinonSpy;

    beforeEach(() => {
        app = express();
        app.use(json());
        handler = spy((req, res, next) => res.sendStatus(200));
        app.post('/:id', [param('id').int(), fail], handler as RequestHandler);
    });

    it('should transform param type correctly', async () => {
        await request(app).post('/1');
        const [req] = handler.firstCall.args;

        expect(req.params)
            .to.have.property('id', 1)
            .which.is.a('number');
    });

    it('should fail due to wrong param type', async () => {
        await request(app).post('/abc').expect(400);
    });

});
