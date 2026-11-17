import type { BrowserActivityCapture, BrowserActivityRecord } from './BrowserActivityTypes.js';
/** Immutable observation metadata, separate from retained event rows. */
export interface ReverseBrowserMetadata extends Omit<BrowserActivityCapture, 'records'> {
}
/** Saved browser provenance identifies the original conversation, run and evidence content. */
export interface ReverseBrowserReference {
    readonly sessionId: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
}
/** A live run carries capture metadata and an event count, never all event rows. */
export interface ReverseBrowserSnapshot extends ReverseBrowserMetadata {
    readonly reference: ReverseBrowserReference;
    readonly recordCount: number;
}
/** Only an archived evidence identity can select saved browser activity. */
export interface ReverseBrowserQuery {
    readonly id: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly cursor?: string;
}
/** One bounded archive page proves both investigation and capture identity. */
export interface ReverseBrowserPage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly metadata: ReverseBrowserMetadata;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: number;
    readonly records: readonly BrowserActivityRecord[];
}
