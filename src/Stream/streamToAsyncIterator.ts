export function streamToAsyncIterator<T = any>(
    stream: ReadableStream,
): AsyncIterable<T> {
    return {
        // @ts-ignore
        [Symbol.asyncIterator]: async function* () {
            const reader = stream.getReader();
            const { done, value } = await reader.read();

            if (!done) yield value;
            else return;
        },
    };
}
