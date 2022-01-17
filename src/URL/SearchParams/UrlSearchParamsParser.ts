import { createStringifiedTypesParser } from '~/TypeParser/createStringifiedTypesParser';
import type { NativeUrlSearchParamsObject } from '~/URL/NativeUrlSearchParamsObject';
import type {
    UrlTransferableDataTypes,
    UrlTransferableDataTypesObject,
    UrlTransferableDataTypesWithArray
} from '~/URL/UrlTransferableDataTypes';

const stringifySingleValueOrArrayOfValues = (
    val: UrlTransferableDataTypesWithArray,
): string | string[] => {
    const stp = createStringifiedTypesParser();

    if (Array.isArray(val)) {
        return (
            val
                // @ts-ignore
                .filter((v: any) => v !== undefined)
                .map((x: UrlTransferableDataTypes) => stp.stringifyValue(x))
        );
    }

    return stp.stringifyValue(val);
};

export class UrlSearchParamsParser<T extends UrlTransferableDataTypesObject> {
    static STRINGIFIED_TYPE_PARSER = createStringifiedTypesParser();

    constructor(public searchParams: URLSearchParams = new URLSearchParams()) {
    }

    static fromObject<Y extends UrlTransferableDataTypesObject>(
        filtersObject: Partial<Y>,
    ): UrlSearchParamsParser<Y> {
        const usp = new URLSearchParams();

        for (const [key, val] of Object.entries(filtersObject)) {
            if (Array.isArray(val)) {
                val.forEach((arrayVal) =>
                    usp.append(
                        key,
                        UrlSearchParamsParser.STRINGIFIED_TYPE_PARSER.stringifyValue(
                            arrayVal,
                        ),
                    ),
                );
                continue;
            }

            usp.set(
                key,
                UrlSearchParamsParser.STRINGIFIED_TYPE_PARSER.stringifyValue(
                    val,
                ),
            );
        }

        return new UrlSearchParamsParser<Y>(usp);
    }

    static stringifyObjectValues<Y extends UrlTransferableDataTypesObject>(
        val: Y,
    ): NativeUrlSearchParamsObject<Partial<Y>> {
        return Object.entries(val).reduce((acc, [key, val]) => {
            return {
                ...acc,
                ...(val !== undefined && {
                    [key]: stringifySingleValueOrArrayOfValues(val),
                }),
            };
        }, {}) as unknown as NativeUrlSearchParamsObject<Y>;
    }

    toObject(): Partial<T> {
        return [...this.searchParams.entries()].reduce((acc, [key, val]) => {
            if (acc.hasOwnProperty(key)) {
                // @ts-ignore
                if (!Array.isArray(acc[key])) {
                    // @ts-ignore
                    acc[key] = [acc[key]];
                }

                return {
                    ...acc,
                    [key]: [
                        // @ts-ignore
                        ...acc[key],
                        UrlSearchParamsParser.STRINGIFIED_TYPE_PARSER.parseString(
                            val,
                        ),
                    ],
                };
            }

            return {
                ...acc,
                [key]: UrlSearchParamsParser.STRINGIFIED_TYPE_PARSER.parseString(
                    val,
                ),
            };
        }, {});
    }

    merge<Y extends UrlTransferableDataTypesObject = T>(
        u: UrlSearchParamsParser<Y>,
    ): UrlSearchParamsParser<Partial<T> & Partial<Y>> {
        return UrlSearchParamsParser.fromObject<Partial<T> & Partial<Y>>({
            ...this.toObject(),
            ...u.toObject(),
        });
    }
}
