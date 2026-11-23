/** A persistent guest cannot silently change CPU architecture. */
export declare const VmAdministrationArchitecture: {
    readonly X86_64: 'x86_64';
    readonly Arm64: 'aarch64';
};
/** One VmAdministrationArchitecture value. */
export type VmAdministrationArchitecture = (typeof VmAdministrationArchitecture)[keyof typeof VmAdministrationArchitecture];
/** Runtime policy is reported independently of sampled host hardware. */
export declare const VmAdministrationRuntime: {
    readonly Cpu: 'qemu-cpu';
    readonly Gpu: 'qemu-gpu';
};
/** One VmAdministrationRuntime value. */
export type VmAdministrationRuntime = (typeof VmAdministrationRuntime)[keyof typeof VmAdministrationRuntime];
/** Named lifecycle operations reported by the authoritative Compute queue. */
export declare const VmAdministrationOperationKind: {
    readonly Provision: 'provision';
    readonly Start: 'start';
    readonly Stop: 'stop';
    readonly Resize: 'resize';
    readonly Backup: 'backup';
    readonly Restore: 'restore';
    readonly Delete: 'delete';
};
/** One VmAdministrationOperationKind value. */
export type VmAdministrationOperationKind = (typeof VmAdministrationOperationKind)[keyof typeof VmAdministrationOperationKind];
/** Queue completion does not assert a direct live guest health measurement. */
export declare const VmAdministrationOperationPhase: {
    readonly Queued: 'queued';
    readonly Running: 'running';
    readonly Reconciling: 'reconciling';
    readonly Succeeded: 'succeeded';
    readonly Failed: 'failed';
};
/** One VmAdministrationOperationPhase value. */
export type VmAdministrationOperationPhase = (typeof VmAdministrationOperationPhase)[keyof typeof VmAdministrationOperationPhase];
/** Only platform-authored bounded progress stages cross this management surface. */
export declare const VmAdministrationProgressStage: {
    readonly Queued: 'queued';
    readonly Claimed: 'claimed';
    readonly Reconciling: 'reconciling';
    readonly Reserving: 'reserving';
    readonly Volumes: 'creating-volumes';
    readonly Network: 'configuring-network';
    readonly Booting: 'booting';
    readonly Ssh: 'waiting-for-ssh';
    readonly Tooling: 'preparing-tools';
    readonly BackingUp: 'backing-up';
    readonly Restoring: 'restoring';
    readonly Stopping: 'stopping';
    readonly Completed: 'completed';
    readonly Failed: 'failed';
};
/** One VmAdministrationProgressStage value. */
export type VmAdministrationProgressStage = (typeof VmAdministrationProgressStage)[keyof typeof VmAdministrationProgressStage];
/** Management is restricted to implemented qualified-account lifecycle operations. */
export declare const VmAdministrationAction: {
    readonly Inspect: 'inspect';
    readonly Provision: 'provision';
    readonly Start: 'start';
    readonly Stop: 'stop';
    readonly Delete: 'delete';
};
/** One VmAdministrationAction value. */
export type VmAdministrationAction = (typeof VmAdministrationAction)[keyof typeof VmAdministrationAction];
/** These are shared control-plane observations, not a substitute for direct guest health checks. */
export declare const VmAdministrationState: {
    readonly Unprovisioned: 'unprovisioned';
    readonly Preparing: 'preparing';
    readonly Reserved: 'reserved';
    readonly Active: 'active';
    readonly Stopping: 'stopping';
    readonly Stopped: 'stopped';
    readonly Recovery: 'recovery-required';
};
/** One VmAdministrationState value. */
export type VmAdministrationState = (typeof VmAdministrationState)[keyof typeof VmAdministrationState];
/** The operator selects one platform account, never an API, tenant, host or machine credential. */
export interface VmAdministrationInspect {
    readonly userId: string;
    /** Opt into storage metadata while older administration clients keep their original view. */
    readonly includeStorage?: boolean;
}
/** An observed exact environment/generation and stable original request ID constrain every mutation. */
export interface VmAdministrationMutation extends VmAdministrationInspect {
    readonly action: typeof VmAdministrationAction.Start | typeof VmAdministrationAction.Stop | typeof VmAdministrationAction.Delete;
    readonly environmentId: string;
    readonly generation: string;
    readonly requestId: string;
    /** Required only for Start; preserves the observed VM profile across request retries. */
    readonly profile?: VmAdministrationProfileReference;
}
/** Create the selected account's default VM in a specific approved site. */
export interface VmAdministrationProvision extends VmAdministrationInspect {
    readonly action: typeof VmAdministrationAction.Provision;
    readonly requestId: string;
    readonly siteId: string;
    readonly profile: VmAdministrationProfileReference;
    readonly disks?: VmAdministrationDiskGeometry;
}
/** Provisioning and changes to an existing environment have different identity requirements. */
export type VmAdministrationChange = VmAdministrationMutation | VmAdministrationProvision;
/** A new deployment default cannot silently replace a persistent VM's retained profile. */
export interface VmAdministrationProfileReference {
    readonly id: string;
    readonly revision: string;
}
/** Exact logical sizes of the system and workspace disks, in bytes. */
export interface VmAdministrationDiskGeometry {
    readonly rootBytes: string;
    readonly workspaceBytes: string;
}
/** The region and compute profile that can use this installed storage geometry. */
export interface VmAdministrationDiskOffer extends VmAdministrationDiskGeometry {
    readonly siteId: string;
    readonly profileId: string;
    readonly profileRevision: string;
}
/** Resource policy quantities remain exact decimal strings across browser and controller boundaries. */
export interface VmAdministrationProfile {
    readonly id: string;
    readonly revision: string;
    readonly architecture: VmAdministrationArchitecture;
    readonly runtime: VmAdministrationRuntime;
    readonly vcpus: number;
    readonly memoryBytes: string;
    readonly gpuCount: number;
    readonly gpuMinimumMemoryBytes: string;
}
/** Platform-authored lifecycle progress excludes raw guest output and internal worker leases. */
export interface VmAdministrationOperation {
    readonly id: string;
    readonly kind: VmAdministrationOperationKind;
    readonly phase: VmAdministrationOperationPhase;
    readonly sequence: string;
    readonly stage: VmAdministrationProgressStage | null;
}
/** No public administrative record contains SSH material, placement addresses or native capabilities. */
export interface VmAdministrationEnvironment {
    readonly id: string;
    readonly generation: string;
    readonly state: VmAdministrationState;
    readonly resourcesReserved: boolean;
    readonly siteId?: string;
    readonly selectedDisks?: VmAdministrationDiskGeometry;
    readonly operation: VmAdministrationOperation | null;
    readonly profile: VmAdministrationProfile | null;
}
/** Configuration options come from the approved fleet and the selected account's profile grants. */
export interface VmAdministrationProvisioning {
    readonly sites: readonly string[];
    readonly profiles: readonly VmAdministrationProfile[];
    readonly diskOffers?: readonly VmAdministrationDiskOffer[];
}
/** A null environment explicitly reports that no managed default has been provisioned. */
export interface VmAdministrationView {
    readonly userId: string;
    readonly providerId: string;
    readonly observedAtMs: string;
    readonly environment: VmAdministrationEnvironment | null;
    readonly defaultProfile: VmAdministrationProfile;
    readonly provisioning?: VmAdministrationProvisioning;
    readonly acceptedOperationId: string | null;
}
/** Read one managed environment for an explicitly authorized platform operator. */
export interface VmAdministrationInspectMethod {
    readonly params: VmAdministrationInspect;
    readonly result: VmAdministrationView;
}
/** Admit one lifecycle operation without waiting for or claiming native completion. */
export interface VmAdministrationMutateMethod {
    readonly params: VmAdministrationChange;
    readonly result: VmAdministrationView;
}
