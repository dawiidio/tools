import { describe, expect, it } from 'vitest';
import { getObjectPropertyByPath } from './getObjectPropertyByPath';

describe('getObjectValueByPath', () => {
    const obj = {
        l1: {
            l2: {
                l3: {
                    l4: {
                        value: 42,
                    },
                },
            },
        },
    };

    it('should obtain value from object', async () => {
        expect(getObjectPropertyByPath(obj, ['l1', 'l2', 'l3', 'l4', 'value'])).toBe(42);
    });

    it('should return undefined on attempt to get value from non existing path', async () => {
        expect(getObjectPropertyByPath(obj, ['l1', 'l2', 'l3', 'l9', 'value'])).toBeUndefined();
    });

    it('should return undefined on attempt to get value from non object nesting', async () => {
        expect(getObjectPropertyByPath({ l1: 12 }, ['l1', 'value'])).toBeUndefined();
    });
});
