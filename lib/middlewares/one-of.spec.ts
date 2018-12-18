import {expect} from 'chai';
import {oneOf, body, f} from '../..';

describe('oneOf', () => {

    it('should set meta data flag "isOneOfMany"', () => {

        const middleware1: any = body(f('name').string());
        const middleware2: any = body(f('age').int());

        oneOf(
            middleware1,
            middleware2,
        );

        expect(middleware1.meta).has.property('isOneOfMany', true);
        expect(middleware2.meta).has.property('isOneOfMany', true);
    });

});