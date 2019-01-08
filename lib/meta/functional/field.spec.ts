import {expect} from 'chai';
import {field} from './field';
import {Field} from '../class/field';

describe('meta.functional.field', () => {

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

    it('should set meta data for sub object validation/transformation for class references', () => {
        class User {
            @Field name: string;
            @Field age: number;
        }

        const {meta} = field('obj').sub(User) as any;
        expect(meta).to.have.property('field', 'obj');
        expect(meta).to.have.property('fields').that.has.lengthOf(2);

        expect(meta.fields[0]).to.have.property('field', 'name');
        expect(meta.fields[0]).to.have.property('type', 'string');

        expect(meta.fields[1]).to.have.property('field', 'age');
        expect(meta.fields[1]).to.have.property('type', 'float');
    });

});
