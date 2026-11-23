// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Protected provider and region identifiers select a separately bounded host page. */
export interface VmFleetRequest {
    readonly providerId: string | null;
    readonly siteId: string | null;
    readonly after: string | null;
}

/** Byte quantities stay exact across the Compute and browser boundaries. */
export interface VmFleetStorage {
    readonly totalBytes: string;
    readonly availableBytes: string;
}

/** Host reports contain GPU observations without hardware paths or passthrough authority. */
export interface VmFleetGpu {
    readonly vendorId: string;
    readonly model: string | null;
    readonly memoryBytes: string | null;
    readonly utilizationPercent: number | null;
}

/** Physical telemetry is distinct from the scheduler's allocation ledger. */
export interface VmFleetHardware {
    readonly observedAtMs: string;
    readonly architecture: 'x86_64' | 'aarch64' | 'unknown';
    readonly cpuModel: string;
    readonly logicalCpus: number;
    readonly memoryBytes: string;
    readonly memoryAvailableBytes: string | null;
    readonly localStorage: VmFleetStorage | null;
    readonly gpus: readonly VmFleetGpu[];
}

/** Allocations may include native runtime overhead and held resources. */
export interface VmFleetAllocation {
    readonly vcpus: number;
    readonly reservedVcpus: number;
    readonly memoryBytes: string;
    readonly reservedMemoryBytes: string;
    readonly reservedVms: number;
    readonly eligibleGpus: number;
    readonly reservedGpus: number;
    readonly inventoryExpiresAtMs: string;
}

/** An enrollment can remain visible without a running guest, fresh telemetry, or placement authority. */
export interface VmFleetHost {
    readonly nodeId: string;
    readonly siteId: string;
    readonly poolId: string;
    readonly hostUse: 'dedicated' | 'cpu-coexist';
    readonly enrollment:
        | 'issued'
        | 'enrolled'
        | 'maintenance'
        | 'activating'
        | 'activation-revoked'
        | 'revalidating'
        | 'revoked';
    readonly maintenance: 'draining' | 'active' | 'released' | 'qualification-retired' | null;
    readonly placement: 'registered' | 'stale' | 'unavailable' | 'maintenance';
    readonly hardware: VmFleetHardware | null;
    readonly allocation: VmFleetAllocation | null;
}

/** The controller enumerates configured provider and region labels without revealing endpoints. */
export interface VmFleetPage {
    readonly providerId: string;
    readonly providers: readonly string[];
    readonly sites: readonly string[];
    readonly observedAtMs: string;
    readonly rows: readonly VmFleetHost[];
    readonly nextNodeId: string | null;
}

/** Platform administrator read of an enrolled fleet, including unallocated nodes. */
export interface VmFleetMethod {
    readonly params: VmFleetRequest;
    readonly result: VmFleetPage;
}
