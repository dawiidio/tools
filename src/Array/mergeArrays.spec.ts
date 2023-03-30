import { describe, expect, it } from 'vitest';
import { mergeArrays } from './mergeArrays';

interface ITest {
    id: number,

    name: string
}

const arr1: ITest[] = [
    {
        name: 'lorem',
        id: 1
    },
    {
        name: 'ipsum',
        id: 2
    },
]

const arr2: ITest[] = [
    {
        name: 'dolor',
        id: 1
    },
    {
        name: 'sit',
        id: 3
    },
]

describe('mergeArrays', () => {
    it('should merge two arrays of objects', async () => {
        const merged = mergeArrays<ITest>(arr1, arr2, {
            findIndex: (entry1, entry2) => entry1.id === entry2.id,
            merge: (entry1, entry2) => ({ ...entry1, ...entry2 })
        });

        expect(merged).toHaveLength(3);
        expect(merged).toEqual(expect.arrayContaining<ITest>([
            {
                name: 'dolor',
                id: 1
            },
            {
                name: 'ipsum',
                id: 2
            },
            {
                name: 'sit',
                id: 3
            },
        ]))
    });
});
