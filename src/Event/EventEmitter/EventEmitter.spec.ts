import { describe, expect, vi } from 'vitest';
import { EventEmitter } from './EventEmitter';

describe('EventEmitter', () => {
    it('should pipe events', async () => {
        const callback = vi.fn();
        const eventName = 'test';

        const sourceEventEmitter = new EventEmitter();
        const destinationEventEmitter = new EventEmitter();

        sourceEventEmitter.pipe(destinationEventEmitter);

        destinationEventEmitter.on(eventName, callback);

        sourceEventEmitter.trigger(eventName, undefined);

        expect(callback).toBeCalledTimes(1);
        expect(callback).toBeCalledWith(eventName, undefined);
    });

    it('should pipe events with prefix', async () => {
        const normalCb = vi.fn();
        const prefixCb = vi.fn();
        const eventName = 'test';
        const eventPrefix = 'x-';
        const prefixedEventName = `${eventPrefix}${eventName}`;

        const sourceEventEmitter = new EventEmitter();
        const destinationEventEmitter = new EventEmitter();

        sourceEventEmitter.pipe(destinationEventEmitter, eventPrefix);

        destinationEventEmitter.on(eventName, normalCb);
        destinationEventEmitter.on(prefixedEventName, prefixCb);

        sourceEventEmitter.trigger(eventName, undefined);

        expect(normalCb).not.toBeCalled();
        expect(prefixCb).toBeCalledTimes(1);
        expect(prefixCb).toBeCalledWith(prefixedEventName, undefined);
    });
});
