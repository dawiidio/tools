import type { WorkerAsyncRequest, WorkerAsyncResponse, WorkerCliType, WorkerPromiseApi } from './IWorkerCli';

const getUUID = () => (self || globalThis).crypto.randomUUID();

enum WorkerCliMessages {
    GET_CLI = 'get-cli'
}

export class WorkerCli<T extends WorkerCliType = WorkerCliType> {
    static flags = {
        exposeCalled: false,
    };
    private asyncRequests = new Map<string, WorkerPromiseApi>();

    constructor(private worker: Worker) {
        this.setupListeners();
    }

    static expose<Y extends WorkerCliType = WorkerCliType>(cli: Y): void {
        if (this.flags.exposeCalled) {
            throw new Error('WorkerCli.expose can only be called once');
        }
        const ctx = (self || globalThis) as unknown as Worker;

        ctx.addEventListener('message', async (event) => {
            const data = event.data as WorkerAsyncRequest;

            if (data.method === WorkerCliMessages.GET_CLI) {
                ctx.postMessage({
                    id: data.id,
                    status: 'resolved',
                    data: Object.keys(cli),
                } as WorkerAsyncResponse<string[]>);
                return;
            }

            if (!cli[data.method]) {
                ctx.postMessage({
                    id: data.id,
                    status: 'rejected',
                    data: `Method ${data.method} not found`,
                } as WorkerAsyncResponse);
                return;
            }

            try {
                ctx.postMessage({
                    data: await cli[data.method](...data.data),
                    status: 'resolved',
                    id: data.id,
                } as WorkerAsyncResponse);
            } catch (e) {
                ctx.postMessage({
                    data: undefined,
                    status: 'rejected',
                    id: data.id,
                } as WorkerAsyncResponse);
            }
        });

        this.flags.exposeCalled = true;
    }

    public async getCli(): Promise<T> {
        const methodsNames = await this.callMethod<string[]>(WorkerCliMessages.GET_CLI);

        return methodsNames.reduce((acc, methodName) => ({
            ...acc,
            [methodName]: (...args: any[]) => this.callMethod(methodName, ...args),
        }), {} as T);
    }

    private async callMethod<Y = any>(method: string, ...data: any[]): Promise<Y> {
        const id = getUUID();

        this.worker.postMessage({
            id,
            data,
            method,
        } as WorkerAsyncRequest);

        return new Promise((resolve, reject) => {
            this.asyncRequests.set(id, { reject, resolve });
        });
    }

    private setupListeners() {
        this.worker.addEventListener('message', (event) => {
            const data = event.data as WorkerAsyncResponse;

            switch (data.status) {
                case 'rejected':
                    this.asyncRequests.get(data.id)?.reject(data.data);
                    break;
                case 'resolved':
                    this.asyncRequests.get(data.id)?.resolve(data.data);
                    break;
                default:
                    throw new Error(`Unknown status: ${data.status}`);
            }

            this.asyncRequests.delete(data.id);
        });
    }
}
