export function getObjectPropertyByPath<T = any>(obj: Record<any, any>, path: string[]): T | undefined {
    const [key, ...rest] = path;

    if (typeof obj !== 'object' || !obj.hasOwnProperty(key))
        return undefined;

    if (rest.length === 0)
        return obj[key];

    return getObjectPropertyByPath(obj[key], rest);
}
