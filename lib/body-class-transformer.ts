import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';

interface InternalBodyClassTransformer {
    isArray?: boolean;
    isOptional?: boolean;
}

export const bodyClassTransformer = type => Object.assign(async function transformer(req, res, next) {
    const self: InternalBodyClassTransformer = transformer as any;
    try {
        const isDefined = req.body !== undefined && !!Object.keys(req.body).length;
        if (isDefined) {
            let valueOrValues = plainToClass(type, req.body);

            if (self.isArray) {
                valueOrValues = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
            }

            const errors = flatten(await Promise.all(
                (([] as any[]).concat(valueOrValues)).map(value => validate(value)),
            ));

            addValidationErrors(req, errors.map(err => mapError(req, err)));

            req.body = valueOrValues;
        } else if (!self.isOptional) {
            addValidationErrors(req, mapError(req, new Error(`Body missing`)))
        }
    } catch (e) {
        addValidationErrors(req, mapError(req, e));
    }
    next();
}, {
    array(this: InternalBodyClassTransformer) {
        this.isArray = true;
        return this;
    },
    opt(this: InternalBodyClassTransformer) {
        this.isOptional = true;
        return this;
    },
});

const flatten = <T>(arr: T[]) => ([] as T[]).concat(...arr);

const mapError = (req, err) => ({
    location: 'body',
    param: req.path,
    value: req.body,
    msg: err.toString(),
});
const addValidationErrors = (req, err) => req._validationErrors = (req._validationErrors || []).concat(err);