export function setObjectPropertyByPath(obj: Record<any, any>, path: string[], valueForLastKey?: any): Record<any, any> {
    const objCopy = {...obj};
    const [key, ...rest] = path;

    if (rest.length === 0 && valueForLastKey !== undefined) {
        objCopy[key] = valueForLastKey;
        return objCopy;
    }

    if (key === undefined)
        return objCopy;

    const value = objCopy[key];

    objCopy[key] = setObjectPropertyByPath({ ...(value || {}) }, rest, valueForLastKey);

    return objCopy;
}
