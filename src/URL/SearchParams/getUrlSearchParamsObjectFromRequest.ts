import { UrlSearchParamsParser } from '~/URL/SearchParams/UrlSearchParamsParser';
import type { UrlTransferableDataTypesObject } from '~/URL/UrlTransferableDataTypes';

export const getUrlSearchParamsObjectFromRequest = <
    T extends UrlTransferableDataTypesObject,
>(
    { url }: Request,
    defaultSearchParams: Partial<T> = {},
): Partial<T> => {
    return UrlSearchParamsParser.fromObject<T>(defaultSearchParams)
        .merge(new UrlSearchParamsParser<T>(new URL(url).searchParams))
        .toObject();
};
