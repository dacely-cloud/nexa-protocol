import type { WorkflowHumanIdentity } from './RunHumanIdentity.js';
import type { WorkflowApprovalProposal } from './RunApprovalTypes.js';
/** Supported answer shapes for the initial owner question component. */
export declare const WorkflowAnswerType: {
    readonly Text: 'text';
    readonly Choice: 'choice';
    readonly Boolean: 'boolean';
};
export type WorkflowAnswerType = (typeof WorkflowAnswerType)[keyof typeof WorkflowAnswerType];
/** A validated question bound to one recorded invocation. */
export interface WorkflowHumanQuestion {
    readonly question: string;
    readonly answerType: WorkflowAnswerType;
    readonly choices: readonly string[];
    readonly timeoutMs: string;
    readonly approval?: WorkflowApprovalProposal;
}
/** An idempotent explicit answer command. */
export interface WorkflowHumanAnswer extends WorkflowHumanIdentity {
    readonly commandId: string;
    readonly answer: string | boolean;
}
/** Terminal outcomes never infer an answer from silence. */
export declare const WorkflowHumanOutcome: {
    readonly Answered: 'answered';
    readonly Expired: 'expired';
    readonly Cancelled: 'cancelled';
    readonly Approved: 'approved';
    readonly Rejected: 'rejected';
    readonly ChangesRequested: 'changes_requested';
};
export type WorkflowHumanOutcome = (typeof WorkflowHumanOutcome)[keyof typeof WorkflowHumanOutcome];
/** Request presentation state also reflects whole-run cancellation. */
export declare const WorkflowHumanStatus: {
    readonly Pending: 'pending';
    readonly Answered: 'answered';
    readonly Expired: 'expired';
    readonly Cancelled: 'cancelled';
    readonly Approved: 'approved';
    readonly Rejected: 'rejected';
    readonly ChangesRequested: 'changes_requested';
};
export type WorkflowHumanStatus = (typeof WorkflowHumanStatus)[keyof typeof WorkflowHumanStatus];
/** Recorded response evidence; expiry contains no actor or answer. */
export interface WorkflowHumanResponse {
    readonly commandId: string | null;
    readonly answer: string | boolean | null;
    readonly actor: string | null;
    readonly atMs: string;
    readonly outcome: WorkflowHumanOutcome;
    readonly proposalRevision?: string;
    readonly comment?: string;
}
/** Bounded persisted metadata alongside the immutable invocation. */
export interface WorkflowHumanRecord extends WorkflowHumanQuestion {
    readonly createdAtMs: string;
    readonly expiresAtMs: string;
    readonly response: WorkflowHumanResponse | null;
}
/** Public owner-scoped read, shared by pending-run views and future inbox navigation. */
export interface WorkflowHumanRequest extends WorkflowHumanIdentity, WorkflowHumanRecord {
    readonly label: string;
    readonly recipient: string;
    readonly status: WorkflowHumanStatus;
    readonly canAnswer: boolean;
}
/** Pending questions are capped per run and returned without completed output bodies. */
export interface WorkflowHumanPage {
    readonly runId: string;
    readonly observedAtMs: string;
    readonly items: readonly WorkflowHumanRequest[];
}
/** Preserve the existing portable module entry while contracts have an independent owner. */
export type { WorkflowHumanIdentity } from './RunHumanIdentity.js';
