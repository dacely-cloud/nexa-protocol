import type { ApprovalRequestedData, ApprovalResolvedData, SessionMessageData, ToolSitesData, TurnEndData, TurnEventData } from './ProtocolEventTypes.js';
/** Stable identity and original time of a visible conversation event. */
export interface HistoryRecordBase {
    readonly id: string;
    readonly at: number;
}
/** Original user input, including attachments and steering messages. */
export interface HistoryInput extends HistoryRecordBase {
    readonly kind: 'input';
    readonly data: SessionMessageData;
}
/** Complete wire event, including native worker and media events. */
export interface HistoryEvent extends HistoryRecordBase {
    readonly kind: 'event';
    readonly data: TurnEventData;
}
/** Site decorations arrive separately from the tool result. */
export interface HistorySites extends HistoryRecordBase {
    readonly kind: 'sites';
    readonly data: ToolSitesData;
}
/** Terminal outcome, session identity, and final usage. */
export interface HistoryEnd extends HistoryRecordBase {
    readonly kind: 'end';
    readonly data: TurnEndData;
}
/** Approval controls retain their original request identity. */
export interface HistoryApprovalRequested extends HistoryRecordBase {
    readonly kind: 'approval-requested';
    readonly runId: string | null;
    /** Owning stream, retained when multiple turns share a conversation. */
    readonly streamId?: string;
    readonly data: ApprovalRequestedData;
}
/** Settled approvals must not become actionable again when restored. */
export interface HistoryApprovalResolved extends HistoryRecordBase {
    readonly kind: 'approval-resolved';
    readonly data: ApprovalResolvedData;
}
/** Append-only presentation history, independent of model-context compaction. */
export type SessionHistoryRecord = HistoryInput | HistoryEvent | HistorySites | HistoryEnd | HistoryApprovalRequested | HistoryApprovalResolved;
/** Byte cursors are decimal strings so large journals retain exact offsets. */
export interface SessionHistoryParams {
    readonly id: string;
    readonly cursor?: string;
    readonly endCursor?: string;
    /** Optional bounded read window, up to 1 MiB. */
    readonly pageBytes?: number;
    /** Returns up to eight bounded journal or compact pages in one authenticated request. */
    readonly batchPages?: number;
    /** Unique receiver identity for an acknowledged raw binary history batch. */
    readonly binaryId?: string;
    /** Selects the newest complete input-delimited turns instead of replaying the full archive. */
    readonly recentTurns?: number;
    /** Exclusive original journal boundary for loading an older turn window. */
    readonly beforeCursor?: string;
    /** Canonical display view; the original append-only journal remains available. */
    readonly compact?: boolean;
    /** Pins a canonical view to an original journal boundary across all of its pages. */
    readonly sourceEndCursor?: string;
    /** Omits full delegated events when opening the parent conversation. */
    readonly excludeWorkers?: boolean;
    /** Reads one worker's events from its owned parent, scoped to a response stream. */
    readonly workerId?: string;
    readonly streamId?: string;
}
/** Bounded binary pages can split even a very large individual native event. */
export interface SessionHistoryPage {
    readonly format: 1;
    readonly chunk: string;
    /** Raw transfer metadata; payload bytes never enter the JSON reply. */
    readonly binaryId?: string;
    readonly byteLength?: number;
    /** Coordinator-owned bytes consumed before publishing the metadata reply. */
    readonly payload?: Uint8Array;
    readonly endCursor: string;
    readonly nextCursor?: string;
    /** Original byte cursor for live catch-up after replaying a canonical view. */
    readonly sourceEndCursor?: string;
    /** Original journal boundary preceding this window; omitted when all older history is loaded. */
    readonly beforeCursor?: string;
    /** Confirms that delegated events were omitted from this projection. */
    readonly excludesWorkers?: boolean;
    /** Additional contiguous pages from the same authorized journal snapshot. */
    readonly pages?: readonly SessionHistoryChunk[];
}
/** One additional bounded page; the enclosing response pins both snapshot boundaries. */
export interface SessionHistoryChunk {
    readonly cursor: string;
    readonly chunk: string;
    readonly nextCursor?: string;
}
/** Complete record boundaries for incremental history catch-up. */
export interface SessionHistoryRange {
    readonly cursor: string;
    readonly endCursor: string;
}
/** A small live notification; large records remain in bounded authenticated pages. */
export interface SessionHistoryData extends SessionHistoryRange {
    readonly sessionId: string;
}
