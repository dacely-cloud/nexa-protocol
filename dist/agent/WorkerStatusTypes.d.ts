/** Lifecycle states for Nexa's delegated workers. */
export declare const WorkerState: {
    readonly Queued: 'queued';
    readonly Working: 'working';
    readonly Stopping: 'stopping';
    readonly Done: 'done';
    readonly Failed: 'failed';
    readonly Aborted: 'aborted';
    readonly Refused: 'refused';
};
/** One worker lifecycle state. */
export type WorkerState = (typeof WorkerState)[keyof typeof WorkerState];
/** One worker, identified independently of its shared persona. Times are decimal epoch milliseconds. */
export interface WorkerStatus {
    readonly id: string;
    readonly parentId: string;
    readonly rootId: string;
    readonly agentId: string;
    readonly goal: string;
    readonly depth: number;
    readonly state: WorkerState;
    readonly activity: string;
    readonly startedAt: string;
    readonly lastActivityAt: string;
}
