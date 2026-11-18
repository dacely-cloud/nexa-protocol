// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { VmUsageEnvironment } from './VmUsageTypes.js';

/** Exact network-wide quantities cover every configured provider, independently of the current page. */
export interface VmUsageNetworkTotals {
    readonly runningVms: string;
    readonly preparingVms: string;
    readonly stoppedVms: string;
    readonly unavailableVms: string;
    readonly accountsWithRunningVms: string;
    readonly provisionedVcpus: string;
    readonly provisionedMemoryBytes: string;
}

/** One passive account observation contains no host route, native authority or guest credential. */
export interface VmUsageNetworkRow {
    readonly providerId: string;
    readonly userId: string;
    readonly environment: VmUsageEnvironment;
}

/** A bounded page and full-network totals retain the source's observation time. */
export interface VmUsageNetworkSnapshot {
    readonly observedAtMs: string;
    readonly totals: VmUsageNetworkTotals;
    readonly rows: readonly VmUsageNetworkRow[];
    readonly nextCursor: string | null;
}

/** The cursor selects a page inside protected provider scope and grants no authority. */
export interface VmUsageNetworkRequest {
    readonly cursor: string | null;
}

/** Only freshly verified platform administrators may request network observations. */
export interface VmUsageNetworkMethod {
    readonly params: VmUsageNetworkRequest;
    readonly result: VmUsageNetworkSnapshot;
}
