import {expect} from 'chai';
import {field} from './field';

describe('field', () => {

    it('should set meta data for validation/transformation', () => {
        const {meta} = field('age').int().array() as any;
        expect(meta).to.have.property('field', 'age');
        expect(meta).to.have.property('type', 'int');
        expect(meta).to.have.property('isArray', true);
    });

    it('should set meta data for sub object validation/transformation', () => {
        const {meta} = field('obj').sub(
            field('name').string()
        ) as any;
        expect(meta).to.have.property('field', 'obj');
        expect(meta).to.have.property('fields').that.has.lengthOf(1);

        expect(meta.fields[0]).to.have.property('field', 'name');
        expect(meta.fields[0]).to.have.property('type', 'string');
    });

});