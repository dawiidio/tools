export type NativeUrlSearchParamsObject<T = {}> = Record<
    keyof T,
    string | string[]
>;
