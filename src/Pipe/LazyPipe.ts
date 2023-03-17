export class LazyPipe<V = any> {
    private transformers: Array<(val: any) => any> = [];

    pipe(...transformers: ((val: any) => any)[]): LazyPipe<V> {
        this.transformers.push(...transformers);

        return this;
    }

    run(value: any): V {
        return this.transformers.reduce((acc, f) => f(acc), value);
    }
}
