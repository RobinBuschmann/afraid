import {createDecorators} from './decorators-factory';
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

const decorators = createDecorators();
Object.assign(exports, decorators);

export declare const Optional: () => PropertyDecorator;
export declare const Contains: (elem: any) => PropertyDecorator;
export declare const Equals: (comparison: string) => PropertyDecorator;
export declare const IsAfter: (date?: string) => PropertyDecorator;
export declare const IsAlpha: (locale?: AlphaLocale) => PropertyDecorator;
export declare const IsAlphanumeric: (locale?: AlphanumericLocale) => PropertyDecorator;
export declare const IsAscii: () => PropertyDecorator;
export declare const IsBase64: () => PropertyDecorator;
export declare const IsBefore: (date?: string) => PropertyDecorator;
export declare const IsBoolean: () => PropertyDecorator;
export declare const IsByteLength: ((options: IsByteLengthOptions) => PropertyDecorator) |
    ((min: number, max?: number) => PropertyDecorator);
export declare const IsCreditCard: () => PropertyDecorator;
export declare const IsCurrency: (options?: IsCurrencyOptions) => PropertyDecorator;
export declare const IsDataURI: () => PropertyDecorator;
export declare const IsDecimal: (options?: IsDecimalOptions) => PropertyDecorator;
export declare const IsDivisibleBy: (options?: IsDecimalOptions) => PropertyDecorator;
export declare const IsEmail: (options?: IsEmailOptions) => PropertyDecorator;
export declare const IsEmpty: () => PropertyDecorator;
export declare const IsFQDN: (options?: IsFQDNOptions) => PropertyDecorator;
export declare const IsFloat: (options?: IsFloatOptions) => PropertyDecorator;
export declare const IsFullWidth: () => PropertyDecorator;
export declare const IsHalfWidth: () => PropertyDecorator;
export declare const IsHash: (algorithm: HashAlgorithm) => PropertyDecorator;
export declare const IsHexColor: () => PropertyDecorator;
export declare const IsHexadecimal: () => PropertyDecorator;
export declare const IsIP: (version?: number) => PropertyDecorator;
export declare const IsISBN: (version?: number) => PropertyDecorator;
export declare const IsISSN: (options?: IsISSNOptions) => PropertyDecorator;
export declare const IsISIN: () => PropertyDecorator;
export declare const IsISO8601: () => PropertyDecorator;
export declare const IsISO31661Alpha2: () => PropertyDecorator;
export declare const IsISRC: () => PropertyDecorator;
export declare const IsIn: (values: any[]) => PropertyDecorator;
export declare const IsInt: (options?: IsIntOptions) => PropertyDecorator;
export declare const IsJSON: () => PropertyDecorator;
export declare const IsLatLong: () => PropertyDecorator;
export declare const IsLength: ((options: IsLengthOptions) => PropertyDecorator) |
    ((min: number, max?: number) => PropertyDecorator);
export declare const IsLowercase: () => PropertyDecorator;
export declare const IsMACAddress: () => PropertyDecorator;
export declare const IsMD5: () => PropertyDecorator;
export declare const IsMimeType: () => PropertyDecorator;
export declare const IsMobilePhone: (locale: MobilePhoneLocale, options?: IsMobilePhoneOptions) => PropertyDecorator;
export declare const IsMongoId: () => PropertyDecorator;
export declare const IsMultibyte: () => PropertyDecorator;
export declare const IsNumeric: (options?: IsNumericOptions) => PropertyDecorator;
export declare const IsPort: () => PropertyDecorator;
export declare const IsPostalCode: (locale: PostalCodeLocale) => PropertyDecorator;
export declare const IsSurrogatePair: () => PropertyDecorator;
export declare const IsURL: (options?: IsURLOptions) => PropertyDecorator;
export declare const IsUUID: (version?: 3|4|5|"3"|"4"|"5"|"all") => PropertyDecorator;
export declare const IsUppercase: () => PropertyDecorator;
export declare const IsVariableWidth: () => PropertyDecorator;
export declare const IsWhitelisted: (chars: string | string[]) => PropertyDecorator;
export declare const Matches: (pattern: RegExp | string, modifiers?: string) => PropertyDecorator;

export declare const Blacklist: (chars: string) => PropertyDecorator;
export declare const Escape: () => PropertyDecorator;
export declare const Unescape: () => PropertyDecorator;
export declare const Ltrim: (chars?: string) => PropertyDecorator;
export declare const NormalizeEmail: (email: string, options?: NormalizeEmailOptions) => PropertyDecorator;
export declare const Rtrim: (chars?: string) => PropertyDecorator;
export declare const StripLow: (keep_new_lines?: boolean) => PropertyDecorator;
export declare const ToBoolean: (strict?: boolean) => PropertyDecorator;
export declare const ToDate: () => PropertyDecorator; // Date or null
export declare const ToFloat: () => PropertyDecorator; // number or NaN
export declare const ToInt: (radix?: number) => PropertyDecorator; // number or NaN
export declare const Trim: (chars?: string) => PropertyDecorator;
export declare const Whitelist: (chars: string) => PropertyDecorator;
export declare const ToString: (input: any | any[]) => PropertyDecorator;
