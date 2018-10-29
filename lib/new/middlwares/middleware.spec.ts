import {expect} from 'chai';
import {createMiddleware} from './middleware-factory';
import {f} from '../meta/functional/field';
import {ChainBundler} from '../meta/functional/chain';
import {Field} from '../meta/class/field';
import {FieldType} from '../meta/field-type';
import {IsInt, Optional} from '../meta/class/decorators';

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

        it('should set meta data properly to handler', () => {
            const {meta} = handler;

            expect(meta).to.have.property('field', rootTarget);
            expect(meta).to.have.property('isArray', true);
            expect(meta).to.have.property('isOptional', true);
            expect(meta).to.have.property('fields');
        });

        it('should add no validation errors to context', done => {
            const testValues = [{age: '99', arr: [{name: 'test'}]}];
            const context = {[rootTarget]: testValues};
            handler(context, {}, () => {

                expect(context).to.have.property('validationErrors').that.have.lengthOf(0);
                done();
            });
        });

        it('should add transformed value to context', done => {
            const testValues = [{age: '99', arr: [{name: 'test'}]}];
            const context = {[rootTarget]: testValues};
            handler(context, {}, () => {
                const transformedValues = context[rootTarget];
                const [transformedValue] = transformedValues;

                expect(transformedValues).to.have.lengthOf(1);
                expect(transformedValue).to.have.property('age', 99);
                expect(transformedValue).to.have.property('arr').that.eqls(testValues[0].arr);
                done();
            });
        });

    });

    describe('class', () => {

        let handler;

        before(() => {
            class User {
                @Field name: string;
                @Field @IsInt() age: number;
                @Optional() @Field(() => User) friends: User[];
            }

            handler = middleware(User).opt().array() as any;
        });

        it('should set meta data properly to handler', () => {
            const {meta} = handler;

            expect(meta).to.have.property('field', rootTarget);
            expect(meta).to.have.property('isArray', true);
            expect(meta).to.have.property('isOptional', true);
            expect(meta).to.have.property('fields');
        });


        it('should add no validation errors to context', done => {
            const testValues = [{name: 'bob', age: 99, friends: [{name: 'friend', age: 45}]}];
            const context = {[rootTarget]: testValues};
            handler(context, {}, () => {

                expect(context).to.have.property('validationErrors').that.have.lengthOf(0);
                done();
            });
        });

    });


});
