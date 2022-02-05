export interface TypeParser<T> {
    isStringifiedType(s: string): boolean;
    isType(val: any): val is T;
    stringifyType(val: T): string;
    stringifyToReadableValue(val: T): string;
    parseStringifiedType(s: string): T;
}
