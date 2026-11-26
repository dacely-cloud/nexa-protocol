// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseCatalogQuery } from './ArchiveTypes.js';
import type { ReverseDirectoryState } from './NavigationTypes.js';
import type { NetworkRequest } from './NetworkTypes.js';

/** Metadata navigation never accepts a file path or analyzer capability. */
export interface ReverseNetworkDirectoryQuery extends ReverseCatalogQuery {
    readonly filter?: string;
    readonly method?: string;
    readonly status?: number;
}

/** A request retains metadata even when no agent has captured either payload. */
export interface ReverseNetworkDirectoryRow extends NetworkRequest {
    readonly requestEvidenceId: string | null;
    readonly responseEvidenceId: string | null;
}

/** Source-ordered metadata pages hold at most twenty rows and 12,000 serialized characters. */
export interface ReverseNetworkDirectoryPage {
    readonly runId: string;
    readonly sha256: string;
    readonly state: ReverseDirectoryState;
    readonly error: string | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: string;
    readonly sourceEntries: string;
    readonly requests: readonly ReverseNetworkDirectoryRow[];
}
