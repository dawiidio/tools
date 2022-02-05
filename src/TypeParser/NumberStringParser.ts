import type { TypeParser } from '~/TypeParser/TypeParser';

export class NumberStringParser implements TypeParser<number> {
    static NUMBER_REGEX = /^[+-]?\d+(\.\d+)?$/;

    isType(val: any): val is number {
        return typeof val === 'number';
    }

    isStringifiedType(val: string): boolean {
        return NumberStringParser.NUMBER_REGEX.test(val);
    }

    stringifyType(val: number) {
        return val.toString();
    }

    parseStringifiedType(val: string) {
        return Number(val);
    }

    stringifyToReadableValue(val: number) {
        return this.stringifyType(val);
    }
}
