import type { TypeParser } from '~/TypeParser/TypeParser';

export class UndefinedStringParser implements TypeParser<undefined> {
    isType(val: any): val is undefined {
        return typeof val === 'undefined';
    }

    isStringifiedType(s: string): boolean {
        return s.trim().toLowerCase() === 'undefined';
    }

    stringifyType(val: undefined) {
        return String(val);
    }

    parseStringifiedType(s: string) {
        return undefined;
    }

    stringifyToReadableValue(val: undefined) {
        return this.stringifyType(val);
    }
}
