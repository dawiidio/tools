import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';

export async function readdirRecursively(path: string, nestedPath = path): Promise<string[]> {
    const dirList = await readdir(path);

    const data = await Promise.all(dirList.map(async (pathToFileOrDir): Promise<string[]> => {
        const stats = await stat(join(nestedPath, pathToFileOrDir));
        const relativePath = join(nestedPath, pathToFileOrDir);

        if (stats.isFile()) {
            return [relativePath];
        } else if (stats.isDirectory()) {
            return readdirRecursively(relativePath);
        }

        throw new Error(`Unknown type of path ${pathToFileOrDir}`);
    }));

    return data.flatMap((x) => x);
}
