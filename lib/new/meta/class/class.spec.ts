import {expect} from 'chai';
import {Field} from './field';
import {IsFloat, IsString} from './decorators';
import {resolveFieldMeta} from './field-meta';

describe('meta.class', () => {

    let User;

    before('creates test class', () => {
        class Address {

            @Field
            street: string;
        }

        class InternalUser {

            @IsFloat()
            @Field
            test: number;

            @Field(() => Address)
            address: Address;

        }
        User = InternalUser;
    });

    it('should set meta data for validation/transformation', () => {
       const test = resolveFieldMeta(User);
       ''
    });

});
