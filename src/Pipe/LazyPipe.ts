export type IPipeTransformer = (val: any, ...rest: any[]) => any;

export class LazyPipe<V = any, T extends IPipeTransformer = IPipeTransformer> {
    private transformers: Array<T> = [];

    pipe(...transformers: T[]): LazyPipe<V, T> {
        this.transformers.push(...transformers);

        return this;
    }

    run(value: any, ...args: any[]): V {
        return this.transformers.reduce((acc, f) => {
            return f(acc, ...args);
        }, value);
    }
}
