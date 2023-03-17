import { join, extname, sep } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { readdirRecursively } from '~/FS/readdirRecursively.node';

interface IDirStructure<T extends string = string> {
    [key: string]: T | IDirStructure<T>
}

export async function structuredReaddirRecursively(path: string) {
    const pathsList = await readdirRecursively(path);
    const structureObject: IDirStructure = {};

    for (const path of pathsList) {
        path.split(sep).map(val => {
            if (extname(val)) {
                structureObject.hasOwnProperty('')
            }
            else {

            }
        });
    }
}
