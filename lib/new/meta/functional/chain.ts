import {Arrayfy, SetType} from '../../../utils';

export interface Chain<OBJ extends {}> {
    date(): Chain<SetType<OBJ, Date>>
    float(): Chain<SetType<OBJ, number>>
    int(): Chain<SetType<OBJ, number>>
    string(): Chain<SetType<OBJ, string>>
    boolean(strict?: boolean): Chain<SetType<OBJ, boolean>>
    array(): Chain<Arrayfy<OBJ>>;
    opt(): Chain<Partial<OBJ>>;
    sub: ChainBundler<OBJ>;

    toDate(): Chain<OBJ>;
    toFloat(): Chain<OBJ>;
    toInt(): Chain<OBJ>;
    toBoolean(): Chain<OBJ>;
    equals(): Chain<OBJ>;
    contains(): Chain<OBJ>;
    matches(): Chain<OBJ>;
    isEmail(): Chain<OBJ>;
    isURL(): Chain<OBJ>;
    isMACAddress(): Chain<OBJ>;
    isIP(): Chain<OBJ>;
    isIPRange(): Chain<OBJ>;
    isFQDN(): Chain<OBJ>;
    isBoolean(): Chain<OBJ>;
    isAlpha(): Chain<OBJ>;
    isAlphanumeric(): Chain<OBJ>;
    isNumeric(): Chain<OBJ>;
    isPort(): Chain<OBJ>;
    isLowercase(): Chain<OBJ>;
    isUppercase(): Chain<OBJ>;
    isAscii(): Chain<OBJ>;
    isFullWidth(): Chain<OBJ>;
    isHalfWidth(): Chain<OBJ>;
    isVariableWidth(): Chain<OBJ>;
    isMultibyte(): Chain<OBJ>;
    isSurrogatePair(): Chain<OBJ>;
    isInt(): Chain<OBJ>;
    isFloat(): Chain<OBJ>;
    isDecimal(): Chain<OBJ>;
    isHexadecimal(): Chain<OBJ>;
    isDivisibleBy(): Chain<OBJ>;
    isHexColor(): Chain<OBJ>;
    isISRC(): Chain<OBJ>;
    isMD5(): Chain<OBJ>;
    isHash(): Chain<OBJ>;
    isJWT(): Chain<OBJ>;
    isJSON(): Chain<OBJ>;
    isEmpty(): Chain<OBJ>;
    isLength(): Chain<OBJ>;
    isByteLength(): Chain<OBJ>;
    isUUID(): Chain<OBJ>;
    isMongoId(): Chain<OBJ>;
    isAfter(): Chain<OBJ>;
    isBefore(): Chain<OBJ>;
    isIn(): Chain<OBJ>;
    isCreditCard(): Chain<OBJ>;
    isIdentityCard(): Chain<OBJ>;
    isISIN(): Chain<OBJ>;
    isISBN(): Chain<OBJ>;
    isISSN(): Chain<OBJ>;
    isMobilePhone(): Chain<OBJ>;
    isPostalCode(): Chain<OBJ>;
    isCurrency(): Chain<OBJ>;
    isISO8601(): Chain<OBJ>;
    isRFC3339(): Chain<OBJ>;
    isISO31661Alpha2(): Chain<OBJ>;
    isISO31661Alpha3(): Chain<OBJ>;
    isBase64(): Chain<OBJ>;
    isDataURI(): Chain<OBJ>;
    isMagnetURI(): Chain<OBJ>;
    isMimeType(): Chain<OBJ>;
    isLatLong(): Chain<OBJ>;
    ltrim(): Chain<OBJ>;
    rtrim(): Chain<OBJ>;
    trim(): Chain<OBJ>;
    escape(): Chain<OBJ>;
    unescape(): Chain<OBJ>;
    stripLow(): Chain<OBJ>;
    whitelist(): Chain<OBJ>;
    blacklist(): Chain<OBJ>;
    isWhitelisted(): Chain<OBJ>;
    normalizeEmail(): Chain<OBJ>;
    toString(): Chain<OBJ>;
}

export interface ChainBundler<OBJ> {
    <T>(type: new () => T): Chain<SetType<OBJ, T>>
    <S1>(chain1: Chain<S1>): Chain<SetType<OBJ, S1>>
    <S1,S2>(chain1: Chain<S1>,chain2: Chain<S2>): Chain<SetType<OBJ, S1&S2>>
    <S1,S2,S3>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>): Chain<SetType<OBJ, S1&S2&S3>>
    <S1,S2,S3,S4>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>): Chain<SetType<OBJ, S1&S2&S3&S4>>
    <S1,S2,S3,S4,S5>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>): Chain<SetType<OBJ, S1&S2&S3&S4&S5>>
    <S1,S2,S3,S4,S5,S6>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6>>
    <S1,S2,S3,S4,S5,S6,S7>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7>>
    <S1,S2,S3,S4,S5,S6,S7,S8>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>,chain15: Chain<S15>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14&S15>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>,chain15: Chain<S15>,chain16: Chain<S16>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14&S15&S16>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16,S17>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>,chain15: Chain<S15>,chain16: Chain<S16>,chain17: Chain<S17>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14&S15&S16&S17>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16,S17,S18>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>,chain15: Chain<S15>,chain16: Chain<S16>,chain17: Chain<S17>,chain18: Chain<S18>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14&S15&S16&S17&S18>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>,chain15: Chain<S15>,chain16: Chain<S16>,chain17: Chain<S17>,chain18: Chain<S18>,chain19: Chain<S19>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14&S15&S16&S17&S18&S19>>
    <S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S20>(chain1: Chain<S1>,chain2: Chain<S2>,chain3: Chain<S3>,chain4: Chain<S4>,chain5: Chain<S5>,chain6: Chain<S6>,chain7: Chain<S7>,chain8: Chain<S8>,chain9: Chain<S9>,chain10: Chain<S10>,chain11: Chain<S11>,chain12: Chain<S12>,chain13: Chain<S13>,chain14: Chain<S14>,chain15: Chain<S15>,chain16: Chain<S16>,chain17: Chain<S17>,chain18: Chain<S18>,chain19: Chain<S19>,chain20: Chain<S20>): Chain<SetType<OBJ, S1&S2&S3&S4&S5&S6&S7&S8&S9&S10&S11&S12&S13&S14&S15&S16&S17&S18&S19&S20>>
}
