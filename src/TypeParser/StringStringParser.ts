import type { TypeParser } from '~/TypeParser/TypeParser';

export class StringStringParser implements TypeParser<string> {
    isType(val: any): val is string {
        return typeof val === 'string';
    }

    isStringifiedType(s: string): boolean {
        return true;
    }

    stringifyType(val: string) {
        return val;
    }

    parseStringifiedType(s: string) {
        return s;
    }

    stringifyToReadableValue(val: string) {
        return this.stringifyType(val);
    }
}
