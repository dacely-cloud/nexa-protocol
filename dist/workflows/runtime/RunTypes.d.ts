import type { WorkflowRunMode, WorkflowRunSnapshot } from './RunSnapshotTypes.js';
import type { WorkflowScheduleSource } from '../schedule/ScheduleTypes.js';
import type { WorkflowPublicationReference } from '../PublicationTypes.js';
import type { WorkflowNode, WorkflowEdge, WorkflowObject, WorkflowValue } from '../WorkflowPrimitives.js';
import type { ComponentDefinition } from '../ComponentTypes.js';
export declare const WorkflowRunStatus: {
    readonly Queued: 'queued';
    readonly Running: 'running';
    readonly Waiting: 'waiting';
    readonly Succeeded: 'succeeded';
    readonly Failed: 'failed';
    readonly Cancelled: 'cancelled';
};
export type WorkflowRunStatus = (typeof WorkflowRunStatus)[keyof typeof WorkflowRunStatus];
export declare const WorkflowStepStatus: {
    readonly Running: 'running';
    readonly Waiting: 'waiting';
    readonly Succeeded: 'succeeded';
    readonly Failed: 'failed';
    readonly Skipped: 'skipped';
    readonly Interrupted: 'interrupted';
    readonly Uncertain: 'uncertain';
    readonly Cancelled: 'cancelled';
};
export type WorkflowStepStatus = (typeof WorkflowStepStatus)[keyof typeof WorkflowStepStatus];
export declare const WorkflowRunEventKind: {
    readonly Accepted: 'accepted';
    readonly Claimed: 'claimed';
    readonly StepStarted: 'step-started';
    readonly StepWaiting: 'step-waiting';
    readonly Suspended: 'suspended';
    readonly Resumed: 'resumed';
    readonly StepFinished: 'step-finished';
    readonly Finished: 'finished';
    readonly Cancelled: 'cancelled';
};
export type WorkflowRunEventKind = (typeof WorkflowRunEventKind)[keyof typeof WorkflowRunEventKind];
/** Resolved contracts exist separately from the persisted graph and mutable run state. */
export interface WorkflowPlanStep {
    readonly node: WorkflowNode;
    readonly definition: ComponentDefinition;
    readonly incoming: readonly WorkflowEdge[];
}
export interface WorkflowExecutionPlan {
    readonly snapshot: WorkflowRunSnapshot;
    readonly steps: readonly WorkflowPlanStep[];
}
/** Optional presentation is captured with the result, independently of later draft edits. */
export declare const WorkflowOutputView: {
    readonly Automatic: 'auto';
    readonly Text: 'text';
    readonly Table: 'table';
    readonly Data: 'data';
};
export type WorkflowOutputView = (typeof WorkflowOutputView)[keyof typeof WorkflowOutputView];
export interface WorkflowNamedResult {
    readonly view?: WorkflowOutputView;
    readonly name: string;
    readonly value: WorkflowValue;
}
export interface WorkflowStepResult {
    readonly outputs: WorkflowObject;
    readonly routes: readonly string[];
    readonly result: WorkflowNamedResult | null;
}
/** An execution instance points back to the immutable authored card and its collection item. */
export interface WorkflowStepOrigin {
    readonly nodeId: string;
    readonly loopId: string;
    readonly itemIndex: number;
}
export interface WorkflowStepState {
    /** Only repeated instances carry this provenance; nodeId identifies the execution instance. */
    readonly origin?: WorkflowStepOrigin;
    /** Persisted timer target; retained after completion or cancellation as timing evidence. */
    readonly wakeAtMs?: string;
    readonly nodeId: string;
    readonly invocationId: string;
    readonly attempt: number;
    readonly status: WorkflowStepStatus;
    readonly startedAtMs: string;
    readonly finishedAtMs: string | null;
    readonly result: WorkflowStepResult | null;
    readonly message: string | null;
}
/** A lease epoch is a fencing token, not a revision of the workflow definition. */
export interface WorkflowRunLease {
    readonly principal: string;
    readonly runId: string;
    readonly workerId: string;
    readonly epoch: string;
}
export interface WorkflowRunSummary {
    /** Present only on scheduled published runs. */
    readonly schedule?: WorkflowScheduleSource;
    readonly publication?: WorkflowPublicationReference;
    readonly runId: string;
    readonly workflowId: string;
    readonly workflowRevision: string;
    readonly mode: WorkflowRunMode;
    readonly status: WorkflowRunStatus;
    readonly createdAtMs: string;
    readonly updatedAtMs: string;
    readonly sequence: string;
    readonly message: string | null;
}
export interface WorkflowRunEvent {
    readonly origin?: WorkflowStepOrigin;
    readonly runId: string;
    readonly sequence: string;
    readonly atMs: string;
    readonly kind: WorkflowRunEventKind;
    readonly nodeId: string | null;
    readonly invocationId: string | null;
    readonly status: WorkflowRunStatus | WorkflowStepStatus;
    readonly message: string | null;
}
/** Preserve the existing portable module entry while contracts have an independent owner. */
export { WorkflowRunMode } from './RunSnapshotTypes.js';
export type { WorkflowRunSnapshot } from './RunSnapshotTypes.js';
