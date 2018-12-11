import {Arrayfy, SetType} from '../../utils';
import AlphaLocale = ValidatorJS.AlphaLocale;
import AlphanumericLocale = ValidatorJS.AlphanumericLocale;
import IsByteLengthOptions = ValidatorJS.IsByteLengthOptions;
import IsCurrencyOptions = ValidatorJS.IsCurrencyOptions;
import IsDecimalOptions = ValidatorJS.IsDecimalOptions;
import IsEmailOptions = ValidatorJS.IsEmailOptions;
import IsFQDNOptions = ValidatorJS.IsFQDNOptions;
import IsFloatOptions = ValidatorJS.IsFloatOptions;
import HashAlgorithm = ValidatorJS.HashAlgorithm;
import IsISSNOptions = ValidatorJS.IsISSNOptions;
import IsIntOptions = ValidatorJS.IsIntOptions;
import IsLengthOptions = ValidatorJS.IsLengthOptions;
import MobilePhoneLocale = ValidatorJS.MobilePhoneLocale;
import IsMobilePhoneOptions = ValidatorJS.IsMobilePhoneOptions;
import IsNumericOptions = ValidatorJS.IsNumericOptions;
import PostalCodeLocale = ValidatorJS.PostalCodeLocale;
import IsURLOptions = ValidatorJS.IsURLOptions;
import NormalizeEmailOptions = ValidatorJS.NormalizeEmailOptions;

interface Handler {
    (...a: object[]);
}

export interface Chain<OBJ extends {}> extends Handler{
    date(): Chain<SetType<OBJ, Date>>
    float(): Chain<SetType<OBJ, number>>
    int(): Chain<SetType<OBJ, number>>
    string(): Chain<SetType<OBJ, string>>
    boolean(strict?: boolean): Chain<SetType<OBJ, boolean>>
    array(): Chain<Arrayfy<OBJ>>;
    opt(): Chain<Partial<OBJ>>;
    sub: ChainBundler<OBJ>;
    description(value: string): Chain<OBJ>;

    contains(elem: any): Chain<OBJ>;
    equals(comparison: string): Chain<OBJ>;
    isAfter(date?: string): Chain<OBJ>;
    isAlpha(locale?: AlphaLocale): Chain<OBJ>;
    isAlphanumeric(locale?: AlphanumericLocale): Chain<OBJ>;
    isAscii(): Chain<OBJ>;
    isBase64(): Chain<OBJ>;
    isBefore(date?: string): Chain<OBJ>;
    isBoolean(): Chain<OBJ>;
    isByteLength(options: IsByteLengthOptions): Chain<OBJ>;
    isByteLength(min: number, max?: number): Chain<OBJ>;
    isCreditCard(): Chain<OBJ>;
    isCurrency(options?: IsCurrencyOptions): Chain<OBJ>;
    isDataURI(): Chain<OBJ>;
    isDecimal(options?: IsDecimalOptions): Chain<OBJ>;
    isDivisibleBy(number: number): Chain<OBJ>;
    isEmail(options?: IsEmailOptions): Chain<OBJ>;
    isEmpty(): Chain<OBJ>;
    isFQDN(options?: IsFQDNOptions): Chain<OBJ>;
    isFloat(options?: IsFloatOptions): Chain<OBJ>;
    isFullWidth(): Chain<OBJ>;
    isHalfWidth(): Chain<OBJ>;
    isHash(algorithm: HashAlgorithm): Chain<OBJ>;
    isHexColor(): Chain<OBJ>;
    isHexadecimal(): Chain<OBJ>;
    isIP(version?: number): Chain<OBJ>;
    isISBN(version?: number): Chain<OBJ>;
    isISSN(options?: IsISSNOptions): Chain<OBJ>;
    isISIN(): Chain<OBJ>;
    isISO8601(): Chain<OBJ>;
    isISO31661Alpha2(): Chain<OBJ>;
    isISRC(): Chain<OBJ>;
    isIn(values: any[]): Chain<OBJ>;
    isInt(options?: IsIntOptions): Chain<OBJ>;
    isJSON(): Chain<OBJ>;
    isLatLong(): Chain<OBJ>;
    isLength(options: IsLengthOptions): Chain<OBJ>;
    isLength(min: number, max?: number): Chain<OBJ>;
    isLowercase(): Chain<OBJ>;
    isMACAddress(): Chain<OBJ>;
    isMD5(): Chain<OBJ>;
    isMimeType(): Chain<OBJ>;
    isMobilePhone(locale: MobilePhoneLocale, options?: IsMobilePhoneOptions): Chain<OBJ>;
    isMongoId(): Chain<OBJ>;
    isMultibyte(): Chain<OBJ>;
    isNumeric(options?: IsNumericOptions): Chain<OBJ>;
    isPort(): Chain<OBJ>;
    isPostalCode(locale: PostalCodeLocale): Chain<OBJ>;
    isSurrogatePair(): Chain<OBJ>;
    isURL(options?: IsURLOptions): Chain<OBJ>;
    isUUID(version?: 3|4|5|"3"|"4"|"5"|"all"): Chain<OBJ>;
    isUppercase(): Chain<OBJ>;
    isVariableWidth(): Chain<OBJ>;
    isWhitelisted(chars: string | string[]): Chain<OBJ>;
    matches(pattern: RegExp | string, modifiers?: string): Chain<OBJ>;

    blacklist(chars: string): Chain<OBJ>;
    escape(): Chain<OBJ>;
    unescape(): Chain<OBJ>;
    ltrim(chars?: string): Chain<OBJ>;
    normalizeEmail(email: string, options?: NormalizeEmailOptions): Chain<OBJ>;
    rtrim(chars?: string): Chain<OBJ>;
    stripLow(keep_new_lines?: boolean): Chain<OBJ>;
    toBoolean(strict?: boolean): Chain<OBJ>;
    toDate(): Chain<OBJ>;
    toFloat(): Chain<OBJ>;
    toInt(radix?: number): Chain<OBJ>;
    trim(chars?: string): Chain<OBJ>;
    whitelist(chars: string): Chain<OBJ>;
    toString(input: any | any[]): Chain<OBJ>;

}

export interface ChainBundler<OBJ> {
    <T>(type: new (...args: any[]) => T): Chain<SetType<OBJ, T>>
    (): Chain<OBJ>
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
