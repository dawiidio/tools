import { describe, expect, it } from 'vitest';
import { FormDataParser } from '~/Form/FormDataParser/FormDataParser';

describe('FormDataParser', () => {
    it('should create instance with default data', async () => {
        const fdp = new FormDataParser();

        expect(fdp.formData).toBeInstanceOf(FormData);
        expect([...fdp.formData.keys()]).toHaveLength(0);
    });

    it('should throw error when nested object was passed', async () => {
        expect(() => {
            FormDataParser.fromObject({
                d: {},
            });
        }).toThrow();
    });

    it('should throw error when nested object was passed as array entry', async () => {
        expect(() => {
            FormDataParser.fromObject({
                d: [{}],
            });
        }).toThrow();
    });

    it('should create instance from object', async () => {
        const fdp = FormDataParser.fromObject({
            a: 90,
            b: 'xyz',
            c: [12, 23],
        });

        expect([...fdp.formData.keys()]).toHaveLength(4); // 4 because FormData is flat and [12, 23] is treated as separated key:val
        expect(fdp.toObject()).toStrictEqual({
            a: '90',
            b: 'xyz',
            c: ['12', '23'],
        });
    });

    it('should convert FormData to object', async () => {
        const fd = new FormData();

        fd.set('a', '34');
        fd.append('b', 'lorem');
        fd.append('b', 'ipsum');

        const fdp = new FormDataParser(fd);

        expect(fdp.toObject()).toStrictEqual({
            a: '34',
            b: ['lorem', 'ipsum'],
        });
    });

    it('should make exception and let the object pass if it is an File instance', async () => {
        const file = new File(['lorem'], 'test.txt', {
            type: 'text/text',
        });

        const fdp = FormDataParser.fromObject({
            file,
        });

        expect(fdp.toObject()).toStrictEqual({
            file,
        });
    });

    it('should make exception and let the object pass if it is an File instance and was passed as array entry', async () => {
        const file = new File(['lorem'], 'test.txt', {
            type: 'text/text',
        });
        const file2 = new File(['ipsum'], 'test2.txt', {
            type: 'text/text',
        });

        const fdp = FormDataParser.fromObject({
            files: [file, file2],
        });

        expect(fdp.toObject()).toStrictEqual({
            files: [file, file2],
        });
    });

    it('should return value as single value in result object even if in FormData value was saved as single-entry array', async () => {
        const file = new File(['lorem'], 'test.txt', {
            type: 'text/text',
        });

        const fdp = FormDataParser.fromObject({
            file: [file],
        });

        expect(fdp.toObject()).toStrictEqual({
            file,
        });
    });
});
