import { setObjectPropertyByPath } from '~/Object/setObjectPropertyByPath';

export const renderTreeFromPaths = (paths: string[], basePath: string, sep: string = '/'): string => {
    let accObj: Record<string, any> = {};

    for (const path of paths) {
        const shortenedPath = path.replace(basePath, '');
        accObj = {
            ...accObj,
            ...setObjectPropertyByPath(accObj, shortenedPath.split(sep), 1),
        };
    }

    const childSign = '├─ ';
    const levelSign = '│  ';

    const logger = (obj: Record<string, any>, currentPath: string = '', lvl = 0): string => {
        return Object.entries(obj).reduce((acc, [key, val]) => {
            const directory = typeof val === 'object';

            if (!lvl) {
                return acc + logger(val, currentPath, lvl + 1);
            }

            return directory
                ? `${acc}\n${currentPath}${childSign}${key}/${logger(val, currentPath + levelSign, lvl + 1)}`
                : `${acc}\n${currentPath}${childSign}${key}`;
        }, '');
    };

    return logger(accObj);
};
