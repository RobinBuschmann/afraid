import {extractMeta} from '../meta-utils';

export const resolveFunctionalFieldMeta = (objs) => ({fields: objs.map(extractMeta)});
