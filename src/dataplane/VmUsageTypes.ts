// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Monitoring never starts, resumes or creates an environment. */
export const VmUsageState = {
    Preparing: 'preparing',
    Running: 'running',
    Stopped: 'stopped',
    Unavailable: 'unavailable',
} as const;
/** One VmUsageState value. */
export type VmUsageState = (typeof VmUsageState)[keyof typeof VmUsageState];

/** Each independently collected observation retains its own freshness. */
export const VmUsageFreshness = {
    Fresh: 'fresh',
    Stale: 'stale',
} as const;
/** One VmUsageFreshness value. */
export type VmUsageFreshness = (typeof VmUsageFreshness)[keyof typeof VmUsageFreshness];

/** CPU time is measured by the hypervisor; guest RAM/filesystem values are informational. */
export const VmUsageSource = {
    Hypervisor: 'hypervisor',
    Guest: 'guest',
} as const;
/** One VmUsageSource value. */
export type VmUsageSource = (typeof VmUsageSource)[keyof typeof VmUsageSource];

/** Exact cumulative nanoseconds survive long-running VMs and JSON serialization. */
export interface VmCpuUsage {
    readonly source: typeof VmUsageSource.Hypervisor;
    readonly observedAtMs: string;
    readonly freshness: VmUsageFreshness;
    readonly cumulativeNanoseconds: string;
    /** Hundredths of a percent of the VM's provisioned vCPU entitlement; may exceed 10000. */
    readonly percentHundredths: string | null;
}

/** Host resident memory includes emulator overhead and is not guest application RAM usage. */
export interface VmHostMemoryUsage {
    readonly observedAtMs: string;
    readonly freshness: VmUsageFreshness;
    readonly residentBytes: string;
}

/** Linux MemAvailable includes reclaimable cache, unlike MemFree. Guest root can alter these values. */
export interface VmGuestMemoryUsage {
    readonly source: typeof VmUsageSource.Guest;
    readonly observedAtMs: string;
    readonly freshness: VmUsageFreshness;
    readonly totalBytes: string;
    readonly availableBytes: string;
    readonly usedBytes: string;
}

/** Process-name aggregates are untrusted guest diagnostics; shared pages can occur in several RSS counts. */
export interface VmProcessMemoryGroup {
    readonly command: string;
    readonly processCount: number;
    readonly residentBytes: string;
    /** Only the reported coverage contributes to this PSS sum. */
    readonly proportionalBytes: string | null;
    readonly proportionalProcessCount: number;
}

/** Coverage remains explicit when process visibility, churn or the bounded profiling budget limits a sample. */
export interface VmProcessMemorySummary {
    readonly observedProcesses: number;
    readonly sampledProcesses: number;
    readonly unreadableProcesses: number;
    readonly proportionalProcesses: number;
    readonly truncated: boolean;
    readonly groups: readonly VmProcessMemoryGroup[];
}

/** Public account metrics never contain detailed PID identities, command arguments or environment values. */
export interface VmProcessMemoryUsage {
    readonly source: typeof VmUsageSource.Guest;
    readonly observedAtMs: string;
    readonly freshness: VmUsageFreshness;
    readonly sample: VmProcessMemorySummary;
}

/** Filesystem consumption differs from provisioned disk size and host physical allocation. */
export interface VmFilesystemUsage {
    readonly source: typeof VmUsageSource.Guest;
    readonly observedAtMs: string;
    readonly freshness: VmUsageFreshness;
    readonly totalBytes: string;
    readonly usedBytes: string;
    readonly availableBytes: string;
}

/** Public projection contains no compute route, runtime credential, native claim or host identity. */
export interface VmUsageEnvironment {
    readonly id: string;
    readonly generation: string;
    readonly state: VmUsageState;
    readonly vcpus: number | null;
    readonly provisionedMemoryBytes: string | null;
    readonly cpu: VmCpuUsage | null;
    readonly hostMemory: VmHostMemoryUsage | null;
    readonly guestMemory: VmGuestMemoryUsage | null;
    /** Older collectors may omit this optional diagnostic without inventing an empty process list. */
    readonly processMemory?: VmProcessMemoryUsage | null;
    readonly root: VmFilesystemUsage | null;
    readonly workspace: VmFilesystemUsage | null;
}

/** A missing environment is a valid read result and must never trigger provisioning. */
export interface VmUsageSnapshot {
    readonly userId: string;
    readonly observedAtMs: string;
    readonly environment: VmUsageEnvironment | null;
}

/** A visible owner panel requests only its current authenticated account. */
export interface VmUsageMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: VmUsageSnapshot;
}

/** Cross-account monitoring is registered only under the explicit administration gate. */
export interface VmUsageAdministrativeMethod {
    readonly params: VmUsageAdministrativeRequest;
    readonly result: VmUsageSnapshot;
}

/** Only a platform account ID is selectable; routing and credentials remain protected. */
export interface VmUsageAdministrativeRequest {
    readonly userId: string;
}
