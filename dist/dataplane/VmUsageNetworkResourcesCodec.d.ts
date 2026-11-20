import type { VmUsageNetworkHostResources, VmUsageNetworkResources } from './VmUsageNetworkTypes.js';
/** Validates fleet aggregates at the gateway and before rendering them. */
export declare class VmUsageNetworkResourcesCodec {
    #private;
    static read(raw: unknown, runningVms: bigint): VmUsageNetworkResources;
    static hosts(raw: unknown, runningVms: bigint): VmUsageNetworkHostResources;
}
