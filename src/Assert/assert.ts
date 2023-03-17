export function assert<T>(value: any, msg?: string): asserts value is NonNullable<T> {
    if (!value) {
        throw new Error(msg || `Value is not defined`);
    }
}
