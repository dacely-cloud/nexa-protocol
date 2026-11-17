import type { WorkflowCalendarTiming } from './CalendarTypes.js';
import type { WorkflowObject } from '../WorkflowPrimitives.js';
/** Fixed schedules and completion-relative delays have distinct activation semantics. */
export declare const WorkflowScheduleKind: {
    readonly Interval: 'interval';
    readonly Once: 'once';
    readonly Calendar: 'calendar';
    readonly Completion: 'after-completion';
};
/** Supported timing forms, with inclusive start and end instants. */
export type WorkflowScheduleTiming = WorkflowIntervalTiming | WorkflowOnceTiming | WorkflowCalendarTiming | WorkflowCompletionTiming;
/** Millisecond strings preserve exact instants across transport and MongoDB. */
export interface WorkflowIntervalTiming {
    readonly kind: typeof WorkflowScheduleKind.Interval;
    readonly startAtMs: string;
    readonly intervalMs: string;
    readonly endAtMs: string | null;
}
/** One run at a time, followed by a delay from its persisted terminal transition. */
export interface WorkflowCompletionTiming {
    readonly kind: typeof WorkflowScheduleKind.Completion;
    readonly startAtMs: string;
    readonly intervalMs: string;
    readonly endAtMs: string | null;
}
/** A single UTC instant, displayed in the user's selected timezone by the client. */
export interface WorkflowOnceTiming {
    readonly kind: typeof WorkflowScheduleKind.Once;
    readonly atMs: string;
}
/** Late occurrences are skipped, coalesced into the latest, or replayed up to a configured cap. */
export declare const WorkflowScheduleMissed: {
    readonly Skip: 'skip';
    readonly Latest: 'latest';
    readonly CatchUp: 'catch-up';
};
/** Explicit outage handling policy. */
export type WorkflowScheduleMissed = (typeof WorkflowScheduleMissed)[keyof typeof WorkflowScheduleMissed];
/** Activation never follows a mutable published pointer or changes a draft. */
export interface WorkflowScheduleRules {
    readonly timing: WorkflowScheduleTiming;
    readonly missed: WorkflowScheduleMissed;
    readonly catchUpLimit: number;
    readonly lateGraceMs: string;
    readonly maxConcurrentRuns: number;
}
/** Activation binds saved timing rules to one publication and its submitted input. */
export interface WorkflowScheduleConfiguration extends WorkflowScheduleRules {
    readonly publicationId: string;
    readonly input: WorkflowObject;
}
/** Configuration revision is independent of execution progress. */
export interface WorkflowScheduleCommand {
    readonly workflowId: string;
    readonly commandId: string;
    readonly expectedRevision: string;
}
/** Explicit enable or replace command containing the reviewed complete configuration. */
export interface WorkflowScheduleEnable extends WorkflowScheduleCommand {
    readonly configuration: WorkflowScheduleConfiguration;
}
/** Owner-scoped current automation state. */
export interface WorkflowScheduleRead {
    readonly workflowId: string;
}
/** Preview performs no activation, storage mutation or run preparation. */
export interface WorkflowSchedulePreview {
    readonly timing: WorkflowScheduleTiming;
    readonly afterMs: string;
}
/** UI and runtime share these lifecycle meanings. */
export declare const WorkflowScheduleStatus: {
    readonly Enabled: 'enabled';
    readonly Disabled: 'disabled';
    readonly Blocked: 'blocked';
    readonly Complete: 'complete';
};
/** Durable activation state, separate from run status. */
export type WorkflowScheduleStatus = (typeof WorkflowScheduleStatus)[keyof typeof WorkflowScheduleStatus];
/** Last dispatch outcome is bounded metadata; accepted work remains in the run journal. */
export declare const WorkflowScheduleOutcome: {
    readonly Accepted: 'accepted';
    readonly Skipped: 'skipped';
    readonly Blocked: 'blocked';
};
/** Concise automation status evidence. */
export interface WorkflowScheduleEvent {
    readonly occurrenceMs: string;
    readonly atMs: string;
    readonly outcome: (typeof WorkflowScheduleOutcome)[keyof typeof WorkflowScheduleOutcome];
    readonly runId: string | null;
    readonly message: string | null;
}
/** No graph, outputs, credentials or unbounded event collections are embedded here. */
export interface WorkflowScheduleView {
    readonly workflowId: string;
    readonly revision: string;
    readonly configuration: WorkflowScheduleConfiguration;
    readonly status: WorkflowScheduleStatus;
    readonly nextAtMs: string | null;
    readonly pendingCount: number;
    readonly skippedOccurrences: string;
    readonly last: WorkflowScheduleEvent | null;
    readonly updatedAtMs: string;
}
/** Immutable provenance included in both the execution snapshot and run metadata. */
export interface WorkflowScheduleSource {
    readonly revision: string;
    readonly occurrenceMs: string;
}
