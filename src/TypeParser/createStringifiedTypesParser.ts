import { BooleanStringParser } from '~/TypeParser/BooleanStringParser';
import { NullStringParser } from '~/TypeParser/NullStringParser';
import { NumberStringParser } from '~/TypeParser/NumberStringParser';
import { StringifiedTypesParser } from '~/TypeParser/StringifiedTypesParser';
import { StringStringParser } from '~/TypeParser/StringStringParser';
import { UndefinedStringParser } from '~/TypeParser/UndefinedStringParser';
import type { TypeParser } from '~/TypeParser/TypeParser';

export const createStringifiedTypesParser = (
    parsers: TypeParser<any>[] = [],
): StringifiedTypesParser => {
    return new StringifiedTypesParser([
        ...parsers,
        new NumberStringParser(),
        new BooleanStringParser(),
        new UndefinedStringParser(),
        new NullStringParser(),
        new StringStringParser(),
    ]);
};
