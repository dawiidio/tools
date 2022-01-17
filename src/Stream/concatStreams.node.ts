import { Readable } from 'node:stream';

export async function* concatStreams(readableStreams: Readable[]) {
    for (const readable of readableStreams) {
        for await (const chunk of readable) {
            yield chunk;
        }
    }
}

