import { describe, it, expect } from 'vitest';
import { UrlSearchParamsParser } from '~/URL/SearchParams/UrlSearchParamsParser';

describe('UrlSearchParamsParser', () => {
    it('should create empty parser', async () => {
        const uspp = new UrlSearchParamsParser();

        expect(uspp).toBeInstanceOf(UrlSearchParamsParser);
    });

    it('should create parser for UrlSearchParams', async () => {
        const usp = new URLSearchParams({
            test: '12',
        });
        const uspp = new UrlSearchParamsParser(usp);

        expect(uspp.searchParams.get('test')).toStrictEqual('12');
    });

    it('should create parser for UrlSearchParams and be able to parse it to object with corresponding types in values', async () => {
        const usp = new URLSearchParams({
            a: '12',
            b: 'test',
            c: 'true',
            d: '12.32',
            e: 'undefined',
        });
        const uspp = new UrlSearchParamsParser(usp);

        expect(uspp.toObject()).toStrictEqual({
            a: 12,
            b: 'test',
            c: true,
            d: 12.32,
            e: undefined,
        });
    });

    it('should create parser for UrlSearchParams and be able to parse array values', async () => {
        const usp = new URLSearchParams('?test=123&test=45&test=12.90');
        const uspp = new UrlSearchParamsParser(usp);

        expect(uspp.toObject()).toStrictEqual({
            test: [123, 45, 12.9],
        });
    });

    it('should create parser from passed object', async () => {
        const uspp = UrlSearchParamsParser.fromObject({
            test: 123,
            arr: [true, false],
        });

        expect(uspp.searchParams.get('test')).toStrictEqual('123');
        expect([...uspp.searchParams.getAll('arr')]).toStrictEqual([
            'true',
            'false',
        ]);
    });

    it('should transform object with mixed but supported types to object with stringified values and excluded keys with "undefined" values', async () => {
        const obj = UrlSearchParamsParser.stringifyObjectValues({
            test: [123, 45, 12.9],
            a: 12,
            b: 'test',
            c: true,
            d: 12.32,
            e: undefined,
        });

        expect(obj).toStrictEqual({
            test: ['123', '45', '12.9'],
            a: '12',
            b: 'test',
            c: 'true',
            d: '12.32',
        });
    });

    it(`should merge two parsers together, second one should override first one's properties`, async () => {
        const uspp1 = UrlSearchParamsParser.fromObject({
            test: 123,
            arr: [true, false],
        });

        const uspp2 = UrlSearchParamsParser.fromObject({
            abc: 12,
            arr: [1, 2, 3],
        });

        expect(uspp1.merge(uspp2).toObject()).toStrictEqual({
            test: 123,
            abc: 12,
            arr: [1, 2, 3],
        });
    });
});
