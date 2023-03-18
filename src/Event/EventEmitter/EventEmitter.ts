export type ListenerFn<E = any> = (eventName: string, event: E) => void;
export type OffListener = () => void;

export class EventEmitter {
    private listeners: Map<string, Set<ListenerFn>> = new Map();
    private locked = false;

    on(eventName: string | '*', listener: ListenerFn): OffListener {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }

        this.listeners.get(eventName)?.add(listener);

        return () => {
            this.listeners.get(eventName)?.delete(listener);
        };
    }

    async runInEventsFreeSandbox(fn: () => void | Promise<void>) {
        this.locked = true;
        await fn();
        this.locked = false;
    }

    off(eventName: string, listener?: ListenerFn): void {
        if (!listener) {
            this.listeners.get(eventName)?.clear();
            return;
        }

        this.listeners.get(eventName)?.delete(listener);
    }

    trigger(eventName: string, data: any): void {
        if (this.locked) return;

        if (eventName === '*')
            throw new Error(`You can not trigger all events at once`);

        const listeners = [
            ...(this.listeners.get(eventName)?.values() || []),
            ...(this.listeners.get('*')?.values() || []),
        ];

        if (listeners.length) {
            listeners.forEach((fn) => fn(eventName, data));
        }
    }

    pipe(destinationEventEmitter: EventEmitter, prefix = ''): OffListener {
        return this.on('*', (eventName, event) => {
            destinationEventEmitter.trigger(`${prefix}${eventName}`, event);
        })
    }
}
