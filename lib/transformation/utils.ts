import {isValidatorName} from '../validation/utils';

export const isTransformerName = (name: string) => !isValidatorName(name);
