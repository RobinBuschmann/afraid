import {expect} from 'chai';
import {validate} from './validate';

describe('validate', () => {

    it('should return no validation errors', () => {
        const validators =[v => undefined];
        const value = {age: '123'};
        const results = validate([{field: 'age', validators}], value);
        expect(results).to.have.lengthOf(0);
    });


    it('should return validation error', () => {
        const errorResult = {};
        const validators = [v => errorResult];
        const value = {age: '123'};
        const results = validate([{field: 'age', validators}], value);
        expect(results).to.have.lengthOf(1);
        expect(results[0]).to.equal(errorResult);
    });

});
