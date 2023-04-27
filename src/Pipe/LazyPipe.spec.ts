import { describe, expect, it, vi } from 'vitest';
import { IPipeTransformer, LazyPipe } from './LazyPipe';

describe('LazyPipe', () => {
    it('should process value from string to number', async () => {
        const lazyPipe = new LazyPipe<number>();

        lazyPipe.pipe((val) => parseFloat(val));

        expect(lazyPipe.run('23.7')).toBe(23.7);
    });

    it('should call transformer with more arguments than only value, while only value can change over transformers calls', async () => {
        const testArgument = 'Lorem ipsum';

        const transformer1: IPipeTransformer = vi.fn((val: string, someArgument: string) => {
            return parseFloat(val);
        });
        const transformer2: IPipeTransformer = vi.fn((val: number, someArgument: string) => {
            return val * 2;
        });

        const lazyPipe = new LazyPipe<number, (val: any, someArgument: string) => number>();

        lazyPipe.pipe(
            transformer1,
            transformer2
        );

        const value = lazyPipe.run('23.5', testArgument);

        expect(transformer1).toBeCalledWith('23.5', testArgument);
        expect(transformer2).toBeCalledWith(23.5, testArgument);
        expect(value).toBe(47);
    });

    it('should run many pipe transformers', async () => {
        const lazyPipe = new LazyPipe<string>();

        lazyPipe.pipe(
            (val: string) => `_${val}_`,
            (val: string) => `prefix${val}postfix`,
            (val: string) => `Fancy value: ${val}`,
        );

        expect(lazyPipe.run('VALUE')).toBe(`Fancy value: prefix_VALUE_postfix`);
    });
});
