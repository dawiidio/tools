import { copyObjectWithin } from './copyObjectWithin';
import { describe, it, expect } from 'vitest';

describe('copyObjectWithin', () => {
    it('should copy object within passed fields', async () => {
        expect(
            copyObjectWithin(
                {
                    test: 12,
                    abc: 23,
                    xyz: 4,
                },
                ['abc'],
            ),
        ).toStrictEqual({
            test: 12,
            xyz: 4,
        });
    });
});
