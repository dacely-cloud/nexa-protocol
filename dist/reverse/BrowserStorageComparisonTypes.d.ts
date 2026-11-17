import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';
import type { BrowserStorageCapture, BrowserStorageGroup, BrowserStorageRow, BrowserStorageMetadata, BrowserStorageQuery } from './BrowserStorageTypes.js';
/** Matching observations prove equality only within their declared complete coverage. */
export declare const BrowserStorageCompareStatus: {
    readonly Changed: 'changed';
    readonly Unchanged: 'unchanged';
    readonly Unknown: 'unknown';
};
/** One storage comparison outcome independent of whether its detail list was retained in full. */
export type BrowserStorageCompareStatus = (typeof BrowserStorageCompareStatus)[keyof typeof BrowserStorageCompareStatus];
/** Independent opt-ins determine whether content or only a name inventory can be compared. */
export declare const BrowserStorageCompareMode: {
    readonly Fingerprints: 'fingerprints';
    readonly Names: 'names';
    readonly Unavailable: 'unavailable';
};
/** Selected comparison authority for one store. */
export type BrowserStorageCompareMode = (typeof BrowserStorageCompareMode)[keyof typeof BrowserStorageCompareMode];
/** Absence becomes a change only when both inventories are complete. */
export declare const BrowserStorageChangeKind: {
    readonly Added: 'added';
    readonly Removed: 'removed';
    readonly Modified: 'modified';
};
/** A proven difference between admissible saved rows. */
export type BrowserStorageChangeKind = (typeof BrowserStorageChangeKind)[keyof typeof BrowserStorageChangeKind];
/** Input identifiers never supply a caller principal, workspace path or browser socket. */
export interface BrowserStorageCompareSelection {
    readonly runId: string;
    readonly evidenceId: string;
}
/** Specialist reads follow only bounded original report text cursors from the shared saved reference. */
export interface BrowserStorageComparisonReadRequest extends BrowserStorageCompareSelection {
    readonly cursor?: string;
}
/** Structured change selectors use store ordinals rather than original-report text offsets. */
export interface BrowserStorageChangesRequest extends BrowserStorageComparisonReadRequest {
    readonly group?: BrowserStorageGroup;
}
/** The trusted tool context supplies the original parent conversation for both captures. */
export interface BrowserStorageCompareRequest {
    readonly before: BrowserStorageCompareSelection;
    readonly after: BrowserStorageCompareSelection;
}
/** A verified host-only original is distinct from any wire page or mutable workspace file. */
export interface BrowserStorageOriginal {
    readonly reference: ReverseBrowserReference;
    readonly sha256: string;
    readonly capture: BrowserStorageCapture;
}
/** Body-free source provenance retains the independent run and original capture hashes. */
export interface BrowserStorageComparisonSource {
    readonly reference: ReverseBrowserReference;
    readonly sha256: string;
    readonly metadata: BrowserStorageMetadata;
}
/** Decimal counts cover all proven differences even if the bounded detail inventory is truncated. */
export interface BrowserStorageGroupComparison {
    readonly mode: BrowserStorageCompareMode;
    readonly status: BrowserStorageCompareStatus;
    readonly complete: boolean;
    readonly reason: string | null;
    readonly ambiguousIdentities: string;
    readonly added: string;
    readonly removed: string;
    readonly modified: string;
    readonly unchanged: string;
    readonly totalChanges: string;
    readonly retainedChanges: string;
    readonly omittedChanges: string;
}
/** Byte deltas are exact signed integers and are available only for the same reported origin. */
export interface BrowserStorageQuotaComparison {
    readonly status: BrowserStorageCompareStatus;
    readonly usageDeltaBytes: string | null;
    readonly quotaDeltaBytes: string | null;
}
/** Stable comparison ordinals refer to the original saved rows without returning their values. */
export interface BrowserStorageChange {
    readonly id: string;
    readonly group: BrowserStorageGroup;
    readonly change: BrowserStorageChangeKind;
    readonly before: BrowserStorageRow | null;
    readonly after: BrowserStorageRow | null;
}
/** Progress includes counters and provenance while changes stay in independently paged evidence. */
export interface BrowserStorageComparison {
    readonly algorithm: 'storage-observations-v1';
    readonly before: BrowserStorageComparisonSource;
    readonly after: BrowserStorageComparisonSource;
    readonly status: BrowserStorageCompareStatus;
    readonly complete: boolean;
    readonly detailsComplete: boolean;
    readonly quota: BrowserStorageQuotaComparison;
    readonly groups: Readonly<Record<BrowserStorageGroup, BrowserStorageGroupComparison>>;
    readonly limitations: readonly string[];
}
/** The bounded original report separates a body-free header from change details. */
export interface BrowserStorageComparisonCapture {
    readonly comparison: BrowserStorageComparison;
    readonly changes: readonly BrowserStorageChange[];
}
/** Archived progress binds the report itself independently of its two source captures. */
export interface BrowserStorageComparisonSnapshot extends BrowserStorageComparison {
    readonly reference: ReverseBrowserReference;
}
/** A comparison directory selects one store and a retained-change ordinal, independently from text offsets. */
export interface BrowserStorageComparisonQuery extends BrowserStorageQuery {
}
/** Header reads contain no changes; store reads return at most twenty directly indexed differences. */
export interface BrowserStorageComparisonPage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly comparison: BrowserStorageComparison;
    readonly group: BrowserStorageGroup | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly changes: readonly BrowserStorageChange[];
}
