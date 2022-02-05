import type { TypeParser } from '~/TypeParser/TypeParser';

export class StringifiedTypesParser {
    constructor(private parsers: TypeParser<any>[]) {}

    parseString<T extends any>(val: string): T {
        const parser = this.parsers.find((p) => p.isStringifiedType(val));

        if (!parser) throw new Error(`Unknown type parser for input: ${val}`);

        return parser.parseStringifiedType(val);
    }

    stringifyValue<T = any>(val: T): string {
        const parser = this.parsers.find((p) => p.isType(val));

        if (!parser)
            throw new Error(`Attempt to parse unknown type: ${typeof val}`);

        return parser.stringifyType(val);
    }

    getReadableValue<T = any>(val: T): string {
        const parser = this.parsers.find((p) => p.isType(val));

        if (!parser)
            throw new Error(`Attempt to parse unknown type: ${typeof val}`);

        return parser.stringifyToReadableValue(val);
    }
}
