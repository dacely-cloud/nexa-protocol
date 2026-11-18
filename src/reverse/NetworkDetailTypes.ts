// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseCatalogQuery } from './ArchiveTypes.js';
import type { NetworkBody } from './NetworkTypes.js';

/** Request detail views share stable source pointers and independently paged text. */
export const NetworkDetailView = {
    RequestHeaders: 'request-headers',
    ResponseHeaders: 'response-headers',
    Query: 'query',
    Timings: 'timings',
    RequestBody: 'request-body',
    ResponseBody: 'response-body',
    Reported: 'reported',
} as const;

/** One saved request representation. */
export type NetworkDetailView = (typeof NetworkDetailView)[keyof typeof NetworkDetailView];

/** Selects only archive-owned entries; no path, capability or executable request crosses RPC. */
export interface ReverseNetworkDetailQuery extends ReverseCatalogQuery {
    readonly selector: string;
    readonly view: NetworkDetailView;
}

/** A complete saved projection digest, independent of the original body and source HAR digests. */
export interface ReverseNetworkDetailPage {
    readonly runId: string;
    readonly sha256: string;
    readonly selector: string;
    readonly location: string;
    readonly view: NetworkDetailView;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly characters: string;
    readonly captureSha256: string;
    readonly body: NetworkBody | null;
    readonly unavailable: string | null;
    readonly text: string;
}
