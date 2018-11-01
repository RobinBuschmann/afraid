import {extractMeta} from '../meta-utils';

export const resolveFieldMeta = (objs) => ({fields: objs.map(extractMeta)});
