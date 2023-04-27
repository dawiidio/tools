// todo use IPipeTransformer instead of (val: any) => any
export class Pipe<V = any> {
    constructor(private startValue: V) {

    }

    static from<V = any>(v: V): Pipe<V> {
        return new Pipe(v);
    }

    pipe<T1, T2, T3, T4, T5>(f1: (val: V) => T1, f2: (val: T1) => T2, f3: (val: T2) => T3, f4: (val: T3) => T4, f5: (val: T4) => T5): Pipe<T5>;
    pipe<T1, T2, T3, T4>(f1: (val: V) => T1, f2: (val: T1) => T2, f3: (val: T2) => T3, f4: (val: T4) => T4): Pipe<T4>;
    pipe<T1, T2, T3>(f1: (val: V) => T1, f2: (val: T1) => T2, f3: (val: T2) => T3): Pipe<T3>;
    pipe<T1, T2>(f1: (val: V) => T1, f2: (val: T1) => T2): Pipe<T2>;
    pipe<T1>(f1: (val: V) => T1): Pipe<T1>;
    pipe<T1>(...functions: ((val: any) => any)[]): Pipe<T1> {
        const value = functions.reduce((acc, f) => f(acc), this.startValue);

        return Pipe.from<T1>(value as unknown as T1);
    }
}
