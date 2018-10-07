import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';
import {InternalTransformerChain} from './transformer';
import {metadata} from './metadata';
import {createBase} from './transform/field-transformer';

const base = createBase(['metadata'], ['array', 'opt']);

const createTransformer = type => async function transform(req, res, next) {
    const {isArray, isOptional} = (transform as InternalTransformerChain).transformer;
    try {
        const isDefined = req.body !== undefined && !!Object.keys(req.body).length;
        if (isDefined) {
            const preValueOrValues = plainToClass(type, req.body);
            const valueOrValues = isArray ? toArray(preValueOrValues) : preValueOrValues;
            const errors = flatten(await Promise.all(toArray(valueOrValues).map(value => validate(value))));

            addValidationErrors(req, errors.map(err => mapError(req, err)));
            req.body = valueOrValues;

        } else if (!isOptional) {
            addValidationErrors(req, mapError(req, new Error(`Body missing`))); // TODO improve error message
        }
    } catch (e) {
        addValidationErrors(req, mapError(req, e));
    }
    next();
};

export const bodyClassTransformer = (type) => Object.assign(
    createTransformer(type),
    base,
    metadata({type, field: 'body', target: 'body'}),
);

const toArray = value => (Array.isArray(value) ? value : [value]) ;
const flatten = <T>(arr: T[]) => ([] as T[]).concat(...arr);

// TODO improve mapping
const mapError = (req, err) => ({
    location: 'body',
    param: req.path,
    value: req.body,
    msg: err.toString(),
});
const addValidationErrors = (req, err) =>
    req._validationErrors = (req._validationErrors || []).concat(err);