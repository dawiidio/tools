import type { OptionItem } from '~/Common/OptionItem';

export type UrlTransferableDataTypes =
    | string
    | number
    | boolean
    | null
    | undefined
    | OptionItem<any>;

export type UrlTransferableDataTypesWithArray =
    UrlTransferableDataTypes |
    UrlTransferableDataTypes[];

export type UrlTransferableDataTypesObject = Record<
    string | number | symbol,
    UrlTransferableDataTypes | UrlTransferableDataTypes[]
>;
