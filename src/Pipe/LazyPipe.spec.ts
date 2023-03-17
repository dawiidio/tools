import { describe, expect, it } from 'vitest';
import { LazyPipe } from './LazyPipe';

describe('LazyPipe', () => {
    it('should process value from string to number', async () => {
        const lazyPipe = new LazyPipe<number>();

        lazyPipe.pipe((val) => parseFloat(val));

        expect(lazyPipe.run('23.7')).toBe(23.7);
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
