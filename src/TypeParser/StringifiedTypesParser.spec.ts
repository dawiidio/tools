import { createStringifiedTypesParser } from './createStringifiedTypesParser';
import { describe, it, expect } from 'vitest';
import { OptionItemStringParser } from '~/TypeParser/OptionItemStringParser';
import type { OptionItem } from '~/Common/OptionItem';
import type { UrlTransferableDataTypesWithArray } from '../URL/UrlTransferableDataTypes';

describe('StringifiedTypesParser', () => {
    let stp = createStringifiedTypesParser([new OptionItemStringParser()]);

    const values: [string, UrlTransferableDataTypesWithArray][] = [
        ['null', null],
        ['true', true],
        ['false', false],
        ['undefined', undefined],
        ['12', 12],
        ['12.12', 12.12],
        ['12.12.32', '12.12.32'],
        ['lorem ipsum', 'lorem ipsum'],
        ['[Test test,test]', { value: 'test', label: 'Test test' }],
    ];

    const unsupportedFiles: Array<[string, object | symbol]> = [
        ['object', {}],
        ['array', []],
        ['symbol', Symbol('Test')],
        ['regexp', new RegExp('d')],
    ];

    it.each(values)(
        `should parse stringified value "%s" to it's corresponding type`,
        (str, expected) => {
            expect(stp.parseString(str)).toStrictEqual(expected);
        },
    );

    it.each(values)(`should stringify value to "%s"`, (expected, val) => {
        expect(stp.stringifyValue(val)).toStrictEqual(expected);
    });

    it.each(unsupportedFiles)(
        `should throw error for attempts of unsupported "%s" type conversion`,
        (desc, val) => {
            expect(() => stp.stringifyValue(val)).toThrow(
                `Attempt to parse unknown type: ${typeof val}`,
            );
        },
    );

    it('should fallback to string in case of badly formatted OptionItem with unsupported signs', () => {
        expect(stp.parseString('[T@_est, @3231]')).toEqual(`[T@_est, @3231]`);
    });

    it('should throw error when passed OptionItem contains unsupported signs', () => {
        expect(() =>
            stp.stringifyValue<OptionItem>({
                value: 'sdfsd@#&',
                label: '$$%2dxs',
            }),
        ).toThrowError(
            `OptionItem [$$%2dxs,sdfsd@#&] includes unsupported signs`,
        );
    });
});
