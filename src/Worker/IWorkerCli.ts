export type WorkerCliType = Record<string, (...args: any[]) => any | Promise<any>>;

export interface WorkerPromiseApi {
    resolve: (value: any) => void;

    reject: (reason: any) => void;
}

export interface WorkerAsyncRequest {
    id: string;

    data: any[];

    method: string;
}

export type WorkerAsyncRequestStatus = 'rejected' | 'resolved';

export interface WorkerAsyncResponse<T = any> {
    id: string;

    status: WorkerAsyncRequestStatus;

    data: T;
}
