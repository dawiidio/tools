import type { TypeParser } from '~/TypeParser/TypeParser';

export class NullStringParser implements TypeParser<null> {
    isType(val: any): val is null {
        return val === null;
    }

    isStringifiedType(s: string) {
        return s.trim().toLowerCase() === 'null';
    }

    stringifyType(val: null) {
        return String(val);
    }

    parseStringifiedType(s: string) {
        return null;
    }

    stringifyToReadableValue(val: null) {
        return this.stringifyType(val);
    }
}
