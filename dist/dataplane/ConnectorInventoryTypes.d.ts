import type { ConnectorHostSummary } from './ConnectorHostTypes.js';
import type { ConnectorView } from './ConnectorTypes.js';
/** Platform labels are finite; unsupported platforms cannot masquerade as qualified Linux installations. */
export declare const ConnectorSystemPlatform: {
    readonly Linux: 'linux';
    readonly Windows: 'windows';
    readonly MacOs: 'macos';
    readonly Other: 'other';
};
/** One ConnectorSystemPlatform value. */
export type ConnectorSystemPlatform = (typeof ConnectorSystemPlatform)[keyof typeof ConnectorSystemPlatform];
/** Missing driver access is different from a successful empty inventory. */
export declare const ConnectorGpuInventoryState: {
    readonly Reported: 'reported';
    readonly Unavailable: 'unavailable';
};
/** One ConnectorGpuInventoryState value. */
export type ConnectorGpuInventoryState = (typeof ConnectorGpuInventoryState)[keyof typeof ConnectorGpuInventoryState];
/** Vendor identities remain separate from compute support and memory availability. */
export declare const ConnectorGpuVendor: {
    readonly Nvidia: 'nvidia';
    readonly Amd: 'amd';
    readonly Intel: 'intel';
    readonly Other: 'other';
};
/** One ConnectorGpuVendor value. */
export type ConnectorGpuVendor = (typeof ConnectorGpuVendor)[keyof typeof ConnectorGpuVendor];
/** Device identifiers and available VRAM support explicit selection without model-authored shell probing. */
export interface ConnectorGpuSpecification {
    readonly id: string;
    readonly vendor: ConnectorGpuVendor;
    readonly model: string;
    readonly totalVramBytes: string | null;
    readonly availableVramBytes: string | null;
}
/** One GPU's load, taken in the same sample as its computer's usage. */
export interface ConnectorGpuUsage {
    /** The reported GPU this load belongs to. */
    readonly id: string;
    /** Busy share of the sampling interval in basis points (0 to 10000); null when the driver does not say. */
    readonly utilizationBasisPoints: number | null;
    /** Video memory in use at sampling time; null when the driver does not say. */
    readonly usedVramBytes: string | null;
}
/**
 * How busy a connected computer was over one short sampling interval.
 *
 * @remarks
 * Shares are integer basis points and rates exact byte integers. A null rate means the computer
 * has no reading for it, which is different from an idle link.
 */
export interface ConnectorSystemUsage {
    readonly sampledAtMs: string;
    /** Length of the interval the CPU share and rates were measured over. */
    readonly intervalMs: number;
    readonly cpuBasisPoints: number;
    readonly networkReceiveBytesPerSecond: string | null;
    readonly networkTransmitBytesPerSecond: string | null;
    readonly gpus: readonly ConnectorGpuUsage[];
}
/** Account-visible metadata contains no IP address, username, process list, mount paths or credentials. */
export interface ConnectorSystemSpecification {
    readonly observedAtMs: string;
    readonly platform: ConnectorSystemPlatform;
    readonly architecture: string;
    readonly osRelease: string;
    readonly cpuModel: string;
    readonly logicalCpuCount: number;
    readonly totalMemoryBytes: string;
    readonly availableMemoryBytes: string;
    readonly gpuState: ConnectorGpuInventoryState;
    readonly gpus: readonly ConnectorGpuSpecification[];
    /** Live load from a connector that samples it; absent from older connectors. */
    readonly usage?: ConnectorSystemUsage;
}
/** Presence is based on the authenticated backend's lease clock and revocation state. */
export declare const ConnectorPresence: {
    readonly Pending: 'pending';
    readonly Online: 'online';
    readonly Offline: 'offline';
    readonly Revoked: 'revoked';
};
/** One ConnectorPresence value. */
export type ConnectorPresence = (typeof ConnectorPresence)[keyof typeof ConnectorPresence];
/** Customer hardware reports never become managed-fleet qualification. */
export declare const ConnectorInventoryTrust: {
    readonly CustomerReported: 'customer-reported';
};
/** One ConnectorInventoryTrust value. */
export type ConnectorInventoryTrust = (typeof ConnectorInventoryTrust)[keyof typeof ConnectorInventoryTrust];
/** An account page accepts only an opaque ordered enrollment cursor. */
export interface ConnectorInventoryParams {
    readonly after: string | null;
}
/** Public inventory contains no customer paths, workload credentials or transport authority. */
export interface ConnectorInventoryView {
    readonly enrollment: ConnectorView;
    readonly presence: ConnectorPresence;
    readonly trust: typeof ConnectorInventoryTrust.CustomerReported;
    readonly specification: ConnectorSystemSpecification | null;
    readonly receivedAtMs: string | null;
    /** Account-owned standing instructions are separate from device-reported metadata. */
    readonly instructions: string;
    /** Independent compare-and-set revision for the user's instruction edits. */
    readonly instructionsRevision: string;
    /** Published full-host consent metadata excludes private working directories. */
    readonly host: ConnectorHostSummary | null;
}
/** At most three connector snapshots are returned by one account RPC. */
export interface ConnectorInventoryPage {
    readonly items: readonly ConnectorInventoryView[];
    readonly next: string | null;
}
/** Nexa forwards an account-bound metadata page through its protected Compute provider. */
export interface ConnectorInventoryMethod {
    readonly params: ConnectorInventoryParams;
    readonly result: ConnectorInventoryPage;
}
