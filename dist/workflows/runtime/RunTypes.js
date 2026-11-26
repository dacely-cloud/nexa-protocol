// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
export const WorkflowRunStatus = {
    Queued: 'queued',
    Running: 'running',
    Waiting: 'waiting',
    Succeeded: 'succeeded',
    Failed: 'failed',
    Cancelled: 'cancelled',
};
export const WorkflowStepStatus = {
    Running: 'running',
    Waiting: 'waiting',
    Succeeded: 'succeeded',
    Failed: 'failed',
    Skipped: 'skipped',
    Interrupted: 'interrupted',
    Uncertain: 'uncertain',
    Cancelled: 'cancelled',
};
export const WorkflowRunEventKind = {
    Accepted: 'accepted',
    Claimed: 'claimed',
    StepStarted: 'step-started',
    StepWaiting: 'step-waiting',
    Suspended: 'suspended',
    Resumed: 'resumed',
    StepFinished: 'step-finished',
    Finished: 'finished',
    Cancelled: 'cancelled',
};
/** Optional presentation is captured with the result, independently of later draft edits. */
export const WorkflowOutputView = {
    Automatic: 'auto',
    Text: 'text',
    Table: 'table',
    Data: 'data',
};
/** Preserve the existing portable module entry while contracts have an independent owner. */
export { WorkflowRunMode } from './RunSnapshotTypes.js';
