import {expect} from 'chai';
import {createMiddleware} from './middleware-factory';
import {f} from '../meta/functional/field';
import {ChainBundler} from '../meta/functional/chain';
import {Field} from '../meta/class/field';
import {FieldType} from '../meta/field-type';
import {IsInt} from '../meta/class/decorators';

describe('middleware', () => {

    const rootTarget = 'any';
    let middleware: ChainBundler<any>;

    before(() => {
        middleware = createMiddleware(rootTarget);
    });


    describe('field', () => {

        let handler;

        before(() => {
            handler = middleware(
                f('age').int(),
                f('arr').sub(
                    f('name').string(),
                ).array(),
            ).opt().array() as any;
        });

        it('should set meta data for validation/transformation properly', () => {
            const {meta} = handler;

            expect(meta).to.have.property('field', rootTarget);
            expect(meta).to.have.property('isArray', true);
            expect(meta).to.have.property('isOptional', true);
            expect(meta).to.have.property('fields');

            expect(meta.fields[0]).to.have.property('field', 'age');
            expect(meta.fields[0]).to.have.property('type', 'int');

            expect(meta.fields[1]).to.have.property('field', 'arr');
            expect(meta.fields[1]).to.have.property('type', 'object');
            expect(meta.fields[1]).to.have.property('isArray', true);
            expect(meta.fields[1]).to.have.property('fields');

            expect(meta.fields[1].fields[0]).to.have.property('field', 'name');
            expect(meta.fields[1].fields[0]).to.have.property('type', 'string');
        });

        it('should validate properly', done => {
            const testValues = [{
               age: '99',
               arr: [{
                   name: 'test',
               }],
            }];
            const context = {[rootTarget]: testValues};
            handler(context, {}, () => {
                const transformedValues = context[rootTarget];
                const [transformedValue] = transformedValues;

                expect(transformedValues).to.have.lengthOf(1);

                expect(transformedValue).to.have.property('age', 99);
                expect(transformedValue).to.have.property('arr').that.eqls(testValues[0].arr);

                expect(context).to.have.property('validationErrors').that.have.lengthOf(0);

                done();
            });
        });

    });

    describe('class', () => {

        it('should set meta data for validation/transformation properly', () => {

            class User {
                @Field name: string;
                @Field @IsInt() age: number;
                @Field(() => User) friends: User[];
            }

            const {meta} = middleware(User).opt().array() as any;

            expect(meta).to.have.property('field', rootTarget);
            expect(meta).to.have.property('isArray', true);
            expect(meta).to.have.property('isOptional', true);
            expect(meta).to.have.property('fields');

            expect(meta.fields[0]).to.have.property('field', 'name');
            expect(meta.fields[0]).to.have.property('type', FieldType.string);

            expect(meta.fields[1]).to.have.property('field', 'age');
            expect(meta.fields[1]).to.have.property('type', FieldType.int);
            expect(meta.fields[1]).to.have.property('validators').that.have.lengthOf(1);

            expect(meta.fields[2]).to.have.property('field', 'friends');
            expect(meta.fields[2]).to.have.property('isArray', true);
            expect(meta.fields[2]).to.have.property('type', FieldType.object);
            expect(meta.fields[2]).to.have.property('fields').that.have.lengthOf(3);
        });

    });


});
