import {expect} from 'chai';
import {transform} from './transform';

describe('transform', () => {

    it('should transform single object', () => {
        const transformers = [v => Number(v)];
        const value = {age: '123'};
        const transformed = transform([{field: 'age', transformers}], value);
        expect(transformed).to.have.property('age', 123);
    });

    it('should transform single object with nested object', () => {
        const transformers = [v => Number(v)];
        const value = {age: '123', obj: {num: '222'}};
        const transformed = transform([
            {
                field: 'age',
                transformers,
            },
            {
                field: 'obj',
                sub: [{
                    field: 'num',
                    transformers,
                }],
            },
        ], value);
        expect(transformed).to.have.property('age', 123);
        expect(transformed).to.have.property('obj')
            .which.eqls({num: 222});
    });

    it('should transform single object with nested array', () => {
        const transformers = [v => Number(v)];
        const value = {age: '123', arr: [{num: '222'}]};
        const transformed = transform([
            {
                field: 'age',
                transformers,
            },
            {
                field: 'arr',
                isArray: true,
                sub: [{
                    field: 'num',
                    transformers,
                }],
            },
        ], value);
        expect(transformed).to.have.property('age', 123);
        expect(transformed).to.have.property('arr')
            .which.is.an('array');
        expect(transformed.arr[0]).to.have.property('num', 222);
    });

    it('should transform array with objects', () => {
        const transformers = [v => Number(v)];
        const values = [{age: '123'}, {age: '321'}];
        const [first, second] = transform([{field: 'age', transformers}], values);
        expect(first).to.have.property('age', 123);
        expect(second).to.have.property('age', 321);
    });

});
