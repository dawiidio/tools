import type { TypeParser } from '~/TypeParser/TypeParser';

export class BooleanStringParser implements TypeParser<boolean> {
    isType(val: any): val is boolean {
        return typeof val === 'boolean';
    }

    isStringifiedType(s: string): boolean {
        return ['true', 'false'].includes(s.trim());
    }

    stringifyType(val: boolean) {
        return String(val);
    }

    stringifyToReadableValue(val: boolean) {
        return this.stringifyType(val);
    }

    parseStringifiedType(s: string) {
        return JSON.parse(s.trim());
    }
}
