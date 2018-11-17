import * as express from 'express';
import {Application, RequestHandler} from 'express';
import {expect, use} from 'chai';
import * as request from 'supertest';
import * as sinonChai from 'sinon-chai';
import {SinonSpy, spy} from 'sinon';
import {json} from 'body-parser';
import {f, fail, query} from '../../';

use(sinonChai);

describe('integration.query', () => {

    let app: Application;
    let handler: SinonSpy;
    const users = '/users';
    const friends = '/friends';
    const consumedEnergy = '/consumed-energy';

    beforeEach(() => {
        app = express();
        app.use(json());

        handler = spy((req, res, next) => res.sendStatus(200));

        app.get(users, [
            query(
                f('limit').int(),
                f('offset').int().opt(),
            ),
            fail,
        ], handler as RequestHandler);

        app.get(consumedEnergy, [
            query(
                f('kwh').float()
            ),
            fail,
        ], handler as RequestHandler);

        app.get(friends, [
            query(f('filters').string().array()),
            fail,
        ], handler as RequestHandler);
    });

    it('should transform query types correctly (number)', async () => {
        await request(app).get(users).query({
            limit: '100',
            offset: '0',
        });
        const [req] = handler.firstCall.args;

        expect(req.query)
            .to.have.property('limit', 100)
            .which.is.a('number');
        expect(req.query)
            .to.have.property('offset', 0)
            .which.is.a('number');
    });

    it('should transform query types correctly (float)', async () => {
        await request(app).get(consumedEnergy).query({
            kwh: '10.45',
        });
        const [req] = handler.firstCall.args;

        expect(req.query)
            .to.have.property('kwh', 10.45)
            .which.is.a('number');
    });

    it('should transform query types correctly (array from multiple)', async () => {
        const filters = ['job:software engineer', 'music-interests:rock'];
        await request(app).get(friends).query({filters});
        const [req] = handler.firstCall.args;

        expect(req.query)
            .to.have.property('filters')
            .which.eqls(filters);
    });

    it('should transform query types correctly (array from single)', async () => {
        const filter = 'job:software engineer';
        await request(app).get(friends).query({filters: filter});
        const [req] = handler.firstCall.args;

        expect(req.query)
            .to.have.property('filters')
            .which.eqls([filter]);
    });

    it('should fail due to wrong param type (not an integer)', async () => {
        await request(app).get(users).query({limit: 'abc'}).expect(400);
    });

    it('should fail due to wrong param type (not a float)', async () => {
        await request(app).get(consumedEnergy).query({kwh: 'abc'}).expect(400);
    });

    it('should not fail due to optional query param', async () => {
        await request(app).get(users).query({
            limit: '100',
        }).expect(200);
    });
});
