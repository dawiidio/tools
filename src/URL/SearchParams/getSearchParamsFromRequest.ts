import { UrlSearchParamsParser } from '~/URL/SearchParams/UrlSearchParamsParser';
import type { UrlTransferableDataTypesObject } from '~/URL/UrlTransferableDataTypes';

export const getSearchParamsFromRequest = <T extends UrlTransferableDataTypesObject>({
    url,
}: Request) => {
    const { searchParams } = new URL(url);

    return new UrlSearchParamsParser<T>(searchParams).toObject();
};
