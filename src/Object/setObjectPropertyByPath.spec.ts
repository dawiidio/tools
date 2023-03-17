import { describe, expect, it } from 'vitest';
import { setObjectPropertyByPath } from './setObjectPropertyByPath';

describe('createObjectNestingFromPath', () => {
    it('should create nested objects structure from path', async () => {
        let obj = setObjectPropertyByPath({}, ['l1', 'l2', 'l3', 'l4']);

        expect(obj.l1?.l2?.l3).not.toBeUndefined();
    });

    it('should create nested objects structure from path with passed value for last key', async () => {
        let obj = setObjectPropertyByPath({}, ['l1', 'l2', 'l3', 'l4', 'value'], 42);

        expect(obj.l1?.l2?.l3?.l4?.value).toBe(42);
    });

    it('should extend existing nested objects structure and add new levels', async () => {
        let obj = setObjectPropertyByPath({
                l1: {
                    a: 'a',
                    l2: {
                        b: 'b'
                    }
                }
            },
            ['l1', 'l2', 'l3', 'l4']
        );

        expect(obj.l1?.a).toBe('a');
        expect(obj.l1?.l2?.b).toBe('b');
        expect(obj.l1?.l2?.l3).not.toBeUndefined();
    });
});
