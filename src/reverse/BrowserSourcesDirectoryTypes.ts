// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';
import type { BrowserSourceScriptSummary, BrowserSourcesView } from './BrowserSourcesToolTypes.js';
import type { BrowserSourceResource, BrowserSourcesCapture } from './BrowserSourcesTypes.js';

/** Source progress carries coverage and counts without code or full inventories. */
export interface BrowserSourcesProjection extends Omit<
    BrowserSourcesCapture,
    'scripts' | 'resources' | 'url' | 'limitations'
> {
    readonly scriptCount: string;
    readonly resourceCount: string;
}

/** A native source capture references one immutable owner-scoped archive. */
export interface BrowserSourcesSnapshot extends BrowserSourcesProjection {
    readonly reference: ReverseBrowserReference;
}

/** Saved source selectors carry IDs and offsets, never sockets, capabilities or workspace paths. */
export interface BrowserSourcesQuery {
    readonly id: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly view: BrowserSourcesView;
    readonly selector?: string;
    readonly cursor?: string;
}

/** A directory script row has source identity and coverage, without the source body. */
export interface BrowserSourceScriptRow extends BrowserSourceScriptSummary {
    readonly kind: 'script';
}

/** Resource metadata remains distinct from a script artifact or execution observation. */
export interface BrowserSourceResourceRow extends BrowserSourceResource {
    readonly kind: 'resource';
}

/** Finite source directory rows are independently paged from text. */
export type BrowserSourceDirectoryRow = BrowserSourceScriptRow | BrowserSourceResourceRow;

/** Source pages use exact UTF-16 offsets and retain the complete source's UTF-8 digest/byte count. */
export interface BrowserSourcesPage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly metadata: BrowserSourcesProjection;
    readonly view: BrowserSourcesView;
    readonly selector: string | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: string;
    readonly records: readonly BrowserSourceDirectoryRow[];
    readonly text: string | null;
    readonly sourceSha256: string | null;
    readonly sourceBytes: string | null;
}
