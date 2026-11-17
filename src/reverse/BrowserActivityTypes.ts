// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** The observation vocabulary contains metadata, never raw response bodies or console values. */
export const BrowserActivityKind = {
    Request: 'request',
    Console: 'console',
    Socket: 'websocket',
    Navigation: 'navigation',
} as const;
/** The finite kinds of retained activity records. */
export type BrowserActivityKind = (typeof BrowserActivityKind)[keyof typeof BrowserActivityKind];
/** A CDP source location is attributed only to the selected origin. */
export interface BrowserActivityLocation {
    readonly url: string;
    readonly line: number;
    readonly column: number;
}
/** One request generation; reused CDP IDs retain distinct predecessors. */
export interface BrowserActivityRequest {
    readonly kind: typeof BrowserActivityKind.Request;
    readonly ordinal: number;
    readonly requestId: string;
    readonly frameId: string;
    readonly url: string;
    readonly method: string;
    readonly resourceType: string;
    readonly timestamp: string;
    readonly initiator: BrowserActivityLocation | null;
    readonly status: number | null;
    readonly mimeType: string | null;
    readonly encodedBytes: string | null;
    readonly finished: boolean;
    readonly failed: boolean;
    readonly redirectedTo: number | null;
    readonly reusedWithoutRedirect: boolean;
}
/** Delivered console argument types and an optional validated source, without primitive values. */
export interface BrowserActivityConsole {
    readonly kind: typeof BrowserActivityKind.Console;
    readonly ordinal: number;
    readonly callType: string;
    readonly argumentTypes: readonly string[];
    readonly timestamp: string;
    readonly source: BrowserActivityLocation | null;
}
/** WebSocket payloads are reduced immediately to direction, opcode and byte count. */
export interface BrowserActivitySocket {
    readonly kind: typeof BrowserActivityKind.Socket;
    readonly ordinal: number;
    readonly requestId: string;
    readonly url: string;
    readonly direction: string;
    readonly opcode: number;
    readonly bytes: string;
    readonly timestamp: string;
}
/** Same-origin main-frame navigations are observed without driving the page. */
export interface BrowserActivityNavigation {
    readonly kind: typeof BrowserActivityKind.Navigation;
    readonly ordinal: number;
    readonly url: string;
    readonly sameDocument: boolean;
}
/** Records form one ordered, bounded capture with independent request-generation identity. */
export type BrowserActivityRecord =
    | BrowserActivityRequest
    | BrowserActivityConsole
    | BrowserActivitySocket
    | BrowserActivityNavigation;
/** Coverage describes attach-window evidence and explicitly accounts for missing observations. */
export interface BrowserActivityCoverage {
    readonly priorActivityAvailable: false;
    readonly truncated: boolean;
    readonly reusedRequestIds: string;
    readonly excluded: string;
    readonly missingPredecessors: string;
    readonly unfinishedRequests: string;
    readonly networkCompleteWithinWindow: boolean;
}
/** A completed capture remains available for scoped paging without reattaching the browser. */
export interface BrowserActivityCapture {
    readonly provider: 'cdp-passive';
    readonly targetId: string;
    readonly origin: string;
    readonly url: string;
    readonly startedAt: string;
    readonly endedAt: string;
    readonly observationMs: number;
    readonly coverage: BrowserActivityCoverage;
    readonly records: readonly BrowserActivityRecord[];
}
