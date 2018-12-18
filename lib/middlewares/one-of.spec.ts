import {expect} from 'chai';
import {oneOf, body, f} from '../..';

describe('oneOf', () => {

    it('should set meta data "nthOneOfMany"', () => {
        const [,middleware1, , middleware2] = oneOf(
            body(f('name').string()),
            body(f('age').int()),
        ) as any;

        expect(middleware1.meta).has.property('nthOneOfMany', 1);
        expect(middleware2.meta).has.property('nthOneOfMany', 2);
    });

});