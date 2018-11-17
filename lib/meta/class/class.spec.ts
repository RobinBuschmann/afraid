import {expect} from 'chai';
import {Field} from './field';
import {IsInt} from './decorators';
import {resolveFieldMeta} from './field-meta';
import {FieldType} from '../field-type';

describe('meta.class', () => {

    let User;

    before('creates test class', () => {
        class Address {
            @Field street: string;
        }
        class InternalUser {
            @Field name: string;
            @IsInt() @Field age: number;
            @Field(() => Address) address: Address;
            @Field(() => InternalUser) friends: InternalUser[];
        }
        User = InternalUser;
    });

    it('should set meta data for validation/transformation', () => {
       const {fields, transformers} = resolveFieldMeta(User);

       const [nameMeta, ageMeta, addressMeta, friendsMeta] = fields;

       expect(fields).to.have.lengthOf(4);
       expect(transformers).to.have.lengthOf(1);

       expect(nameMeta).to.have.property('field', 'name');
       expect(nameMeta).to.have.property('type', FieldType.string);

       expect(ageMeta).to.have.property('field', 'age');
       expect(ageMeta).to.have.property('type', FieldType.int);
       expect(ageMeta).to.have.property('validators').that.have.lengthOf(1);

       expect(addressMeta).to.have.property('field', 'address');
       expect(addressMeta).to.have.property('type', FieldType.object);
       expect(addressMeta).to.have.property('fields').that.have.lengthOf(1);

       expect(friendsMeta).to.have.property('field', 'friends');
       expect(friendsMeta).to.have.property('isArray', true);
       expect(friendsMeta).to.have.property('type', FieldType.object);
       expect(friendsMeta).to.have.property('fields').that.have.lengthOf(4);
    });

});
