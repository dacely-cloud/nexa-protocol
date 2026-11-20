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

/** Coverage and byte totals for one metric across current, verified guest observations. */
export interface VmUsageNetworkResource {
    readonly observedVms: string;
    readonly totalBytes: string;
    readonly availableBytes: string;
}

/** Filesystems are reported independently because two mountpoints can share storage. */
export interface VmUsageNetworkResources {
    readonly memory: VmUsageNetworkResource;
    readonly root: VmUsageNetworkResource;
    readonly workspace: VmUsageNetworkResource;
}

/** A bounded page and full-network totals retain the source's observation time. */
export interface VmUsageNetworkSnapshot {
    readonly observedAtMs: string;
    readonly totals: VmUsageNetworkTotals;
    /** Absent while older Compute controllers or gateways are in service. */
    readonly resources?: VmUsageNetworkResources;
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
