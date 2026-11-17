/** Observed engine operations, independent of presentation timing. */
export declare const RedTeamActionKind: {
    readonly Read: 'read';
    readonly Tool: 'tool';
    readonly Edit: 'edit';
    readonly Wait: 'wait';
    readonly Delegate: 'delegate';
    readonly Result: 'result';
    readonly Verify: 'verify';
    readonly Error: 'error';
};
export type RedTeamActionKind = (typeof RedTeamActionKind)[keyof typeof RedTeamActionKind];
/** Authoritative action lifecycle, including unsuccessful and cancelled operations. */
export declare const RedTeamActionState: {
    readonly Started: 'started';
    readonly Progress: 'progress';
    readonly Succeeded: 'succeeded';
    readonly Failed: 'failed';
    readonly Cancelled: 'cancelled';
    readonly Unconfirmed: 'unconfirmed';
    readonly Waiting: 'waiting';
};
export type RedTeamActionState = (typeof RedTeamActionState)[keyof typeof RedTeamActionState];
/** Content remains a dot; its original session supplies its inspectable details. */
export declare const RedTeamTargetKind: {
    readonly File: 'file';
    readonly Tool: 'tool';
    readonly Terminal: 'terminal';
    readonly Task: 'task';
    readonly Result: 'result';
    readonly Finding: 'finding';
    readonly Plan: 'plan';
};
export type RedTeamTargetKind = (typeof RedTeamTargetKind)[keyof typeof RedTeamTargetKind];
/** Exact native worker frames selected within their original parent archive and response stream. */
export interface RedTeamHistorySelection {
    readonly workerId: string;
    readonly streamId: string;
}
/** A stable owner-scoped reference, never authority to read an arbitrary filesystem path. */
export interface RedTeamActionTarget {
    /** Native descendants retain their actual parent archive rather than synthetic child sessions. */
    readonly historySelection?: RedTeamHistorySelection;
    readonly targetId: string;
    readonly kind: RedTeamTargetKind;
    readonly label: string;
    readonly sessionKey: string;
    readonly toolCallId: string | null;
    readonly fileId: string | null;
    readonly path: string | null;
    readonly line: number | null;
}
/** One exact engine action, ordered by its containing coordination event sequence. */
export interface RedTeamExecutionAction {
    readonly effortId: string;
    readonly agentId: string;
    readonly parentAgentId: string | null;
    readonly actionId: string;
    readonly kind: RedTeamActionKind;
    readonly state: RedTeamActionState;
    readonly target: RedTeamActionTarget;
    readonly relatedTargetId: string | null;
}
