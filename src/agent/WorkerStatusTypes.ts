// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Lifecycle states for Nexa's delegated workers. */
export const WorkerState = {
    Queued: 'queued',
    Working: 'working',
    Stopping: 'stopping',
    Done: 'done',
    Failed: 'failed',
    Aborted: 'aborted',
    Refused: 'refused',
} as const;

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
