export const copyObjectWithin = <T extends {}, K extends keyof T>(
    obj: T,
    keys: K[],
): Omit<T, typeof keys[number]> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
    ) as Omit<T, typeof keys[number]>;
};
