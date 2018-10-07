import {expect} from 'chai';
import {validate} from './validate';

describe('validate', () => {

    it('should return no validation errors', () => {
        const validator = v => undefined;
        const value = {age: '123'};
        const results = validate([{field: 'age', validator}], value);
        expect(results).to.have.lengthOf(0);
    });


    it('should return validation error', () => {
        const errorResult = {};
        const validator = v => errorResult;
        const value = {age: '123'};
        const results = validate([{field: 'age', validator}], value);
        expect(results).to.have.lengthOf(1);
        expect(results[0]).to.equal(errorResult);
    });

});
