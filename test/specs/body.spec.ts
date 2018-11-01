import * as express from 'express';
import {Application, RequestHandler} from 'express';
import {expect, use} from 'chai';
import * as request from 'supertest';
import * as sinonChai from 'sinon-chai';
import {SinonSpy, spy} from 'sinon';
import {json} from 'body-parser';
import {body, f, IsEmail, Field} from '../../';

use(sinonChai);

describe('integration.body', () => {

    const usersRoute = '/users';
    let app: Application;
    let handler: SinonSpy;

    beforeEach(() => {
        app = express();
        app.use(json());
        handler = spy((req, res, next) => res.sendStatus(200));
    });

    const commonTestCases = () => {

        it('should transform body types correctly', async () => {
            const user = {
                name: 'Tony Stark',
                birthday: new Date(1965, 3, 4),
                email: 'ironman@avengers.com',
            };

            await request(app).post(usersRoute).send(user);
            const [req] = handler.firstCall.args;

            expect(req.body).to.eql(user);
        });

    };

    describe('per field', () => {

        beforeEach(() => {
            app.post(usersRoute, [
                body(
                    f('name').string(),
                    f('birthday').date(),
                    f('email').string().isEmail(),
                ),
            ], handler);
        });

        commonTestCases();

    });

    describe('per class', () => {

        const friendsRoute = '/friends';

        class User {
            @Field
            name: string;

            @IsEmail()
            @Field
            email: string;

            @Field(() => Date)
            birthday: Date;
        }

        beforeEach(() => {
            app.post(usersRoute, [
                body(User),
            ], handler as RequestHandler);

            app.post(friendsRoute, [
                body(User).array(),
            ], handler as RequestHandler);
        });

        commonTestCases();

        it('should be an array from multiple values', async () => {
            await request(app).post(friendsRoute).send([{
                name: 'Tony Stark',
                birthday: new Date(1965, 3, 4),
                email: 'ironman@avengers.com',
            }]);
            const [req] = handler.firstCall.args;

            expect(req.body).to.be.an('array');
        });

        it('should be an array from single value', async () => {
            await request(app).post(friendsRoute).send({
                name: 'Tony Stark',
                birthday: new Date(1965, 3, 4),
                email: 'ironman@avengers.com',
            });
            const [req] = handler.firstCall.args;

            expect(req.body).to.be.an('array');
        });

    });

});