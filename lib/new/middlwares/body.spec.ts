import {expect} from 'chai';
import {body} from './body';
import {f} from '../meta/functional/field';

describe('body', () => {

    describe('fields', () => {

        it('should set meta data for validation/transformation properly', () => {

            const {meta: [bodyMeta]} = body(
                f('age').int(),
                f('arr').sub(
                    f('name').string(),
                ).array(),
            ).opt().array() as any;

            expect(bodyMeta).to.have.property('field', 'body');
            expect(bodyMeta).to.have.property('isArray', true);
            expect(bodyMeta).to.have.property('isOptional', true);
            expect(bodyMeta).to.have.property('fields');

            expect(bodyMeta.fields[0]).to.have.property('field', 'age');
            expect(bodyMeta.fields[0]).to.have.property('type', 'int');

            expect(bodyMeta.fields[1]).to.have.property('field', 'arr');
            expect(bodyMeta.fields[1]).to.have.property('type', 'object');
            expect(bodyMeta.fields[1]).to.have.property('isArray', true);
            expect(bodyMeta.fields[1]).to.have.property('fields');

            expect(bodyMeta.fields[1].fields[0]).to.have.property('field', 'name');
            expect(bodyMeta.fields[1].fields[0]).to.have.property('type', 'string');
        });

    });

    // describe('class', () => {
    //
    //     it('should set meta data for validation/transformation properly', () => {
    //
    //         class User {
    //             @Field name: string;
    //             @Field @IsInt() age: number;
    //             @Field(() => User) arr: User[];
    //         }
    //
    //         const {meta} = body(User).opt().array() as any;
    //
    //         expect(meta).to.have.property('field', 'body');
    //         expect(meta).to.have.property('isArray', true);
    //         expect(meta).to.have.property('isOptional', true);
    //         expect(meta).to.have.property('sub');
    //
    //         expect(meta.sub[0]).to.have.property('field', 'age');
    //         expect(meta.sub[0]).to.have.property('type', 'integer');
    //
    //         expect(meta.sub[1]).to.have.property('field', 'arr');
    //         expect(meta.sub[1]).to.have.property('type', 'object');
    //         expect(meta.sub[1]).to.have.property('isArray', true);
    //         expect(meta.sub[1]).to.have.property('sub');
    //
    //         expect(meta.sub[1].sub[0]).to.have.property('field', 'name');
    //         expect(meta.sub[1].sub[0]).to.have.property('type', 'string');
    //     });
    //
    // });


});
