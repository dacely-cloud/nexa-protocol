import type { ConnectorArgumentKind } from './ConnectorArgumentKind.js';
import type { ConnectorInteractiveInvocationRule } from './ConnectorInteractiveInvocationTypes.js';
import type { ConnectorMachineInvocationRule } from './ConnectorMachineInvocationTypes.js';
import type { ConnectorOperationAuthorization } from './ConnectorOperationTypes.js';
import type { ConnectorEnvironmentParams, ConnectorJobPhase, ConnectorResultParams } from './ConnectorTypes.js';
/** Fixed command lanes retain separate original dispatch and compaction history. */
export declare enum ConnectorExecutionLane {
    First = "first",
    Second = "second"
}
/** Local workspace mutation and cloud write delegation must both permit an operation. */
export declare enum ConnectorExecutionAccess {
    ReadOnly = "read-only",
    ReadWrite = "read-write"
}
/** Finite exact choices never authorize arbitrary extra arguments. */
export interface ConnectorArgumentChoice {
    readonly kind: typeof ConnectorArgumentKind.Choice;
    readonly values: readonly string[];
}
/** UTF-8 bytes and relative-path grammar remain enforced independently on the device. */
export interface ConnectorArgumentBound {
    readonly kind: typeof ConnectorArgumentKind.Text | typeof ConnectorArgumentKind.RelativePath;
    readonly maximumBytes: number;
}
/** A declared variable position has exactly one constraint shape. */
export type ConnectorArgumentRule = ConnectorArgumentChoice | ConnectorArgumentBound | ConnectorMachineInvocationRule | ConnectorInteractiveInvocationRule;
/** Public program aliases cannot become host executable paths. */
export interface ConnectorProgramGrant {
    readonly id: string;
    readonly rootIds: readonly string[];
    readonly arguments: readonly ConnectorArgumentRule[];
}
/** A root alias has independently enforced read-only or writable access. */
export interface ConnectorExecutionRoot {
    readonly id: string;
    readonly access: ConnectorExecutionAccess;
}
/** Resource quantities stay exact decimal strings at the JSON gateway. */
export interface ConnectorExecutionResources {
    readonly memoryBytes: string;
    readonly maximumTasks: number;
    readonly cpuQuotaMicros: number;
}
/** Customer-reported public execution grants are not a network endpoint or authorization to run unlisted code. */
export interface ConnectorExecutionProfile {
    readonly revision: string;
    readonly policySha256: string;
    readonly roots: readonly ConnectorExecutionRoot[];
    readonly programs: readonly ConnectorProgramGrant[];
    readonly resources: ConnectorExecutionResources;
    readonly timeoutMs: number;
    readonly maximumAddressBytes: string;
    readonly maximumFileBytes: string;
}
/** Current publication and permanent lane counters serve different purposes. */
export interface ConnectorExecutionLaneStatus {
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly acknowledgedSequence: string;
    readonly online: boolean;
    readonly profile: ConnectorExecutionProfile | null;
}
/** Status lists exactly first and second, without revealing device credentials or private paths. */
export interface ConnectorExecutionStatus extends ConnectorEnvironmentParams {
    readonly lanes: readonly ConnectorExecutionLaneStatus[];
}
/** Original input selects only a reviewed local program, workspace and positional arguments. */
export interface ConnectorExecutionRequest {
    readonly requestId: string;
    readonly policySha256: string;
    readonly programId: string;
    readonly rootId: string;
    readonly arguments: readonly string[];
}
/** Delegation intent is explicit; the API checks actual retained workspace access independently. */
export interface ConnectorExecutionSubmitParams extends ConnectorEnvironmentParams {
    readonly lane: ConnectorExecutionLane;
    readonly previousSequence: string;
    readonly workspaceAccess: ConnectorExecutionAccess;
    readonly request: ConnectorExecutionRequest;
}
/** Transport loss and uncertain commands must never be presented as successful exits. */
export declare enum ConnectorExecutionTermination {
    Exited = "exited",
    Indeterminate = "indeterminate"
}
/** A failure describes observation, not proof that no effect occurred. */
export declare const ConnectorExecutionFailure: {
    readonly Sandbox: 'sandbox';
    readonly Cancelled: 'cancelled';
    readonly Timeout: 'timeout';
    readonly OutputLimit: 'output-limit';
    readonly Signal: 'signal';
    readonly AmbiguousExit: 'ambiguous-exit';
    readonly Interrupted: 'interrupted';
    readonly Expired: 'expired';
};
/** One ConnectorExecutionFailure value. */
export type ConnectorExecutionFailure = (typeof ConnectorExecutionFailure)[keyof typeof ConnectorExecutionFailure];
/** Setup stages contain no raw OS diagnostic or host path. */
export declare const ConnectorExecutionSetupFailure: {
    readonly Bootstrap: 'bootstrap';
    readonly Configuration: 'configuration';
    readonly Namespaces: 'namespaces';
    readonly Cgroup: 'cgroup';
    readonly Mounts: 'mounts';
    readonly AppArmor: 'apparmor';
    readonly Confinement: 'confinement';
    readonly Execute: 'execute';
};
/** One ConnectorExecutionSetupFailure value. */
export type ConnectorExecutionSetupFailure = (typeof ConnectorExecutionSetupFailure)[keyof typeof ConnectorExecutionSetupFailure];
/** Original terminal output is bounded, canonical and signed; contents remain untrusted data. */
export interface ConnectorExecutionResult {
    readonly setupFailure: ConnectorExecutionSetupFailure | null;
    readonly termination: ConnectorExecutionTermination;
    readonly failure: ConnectorExecutionFailure | null;
    readonly exitCode: number | null;
    readonly stdoutBase64: string;
    readonly stderrBase64: string;
}
/** Reads and retries preserve the same admitted original and selected command lane. */
export interface ConnectorExecutionJob extends ConnectorEnvironmentParams {
    readonly id: string;
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly phase: ConnectorJobPhase;
    readonly request: ConnectorExecutionRequest;
    readonly authorization: ConnectorOperationAuthorization;
    readonly admissionHash: string;
    readonly response: ConnectorExecutionResult | null;
}
/** Public account metadata is proxied only through Nexa. */
export interface ConnectorExecutionMethod {
    readonly params: ConnectorEnvironmentParams;
    readonly result: ConnectorExecutionStatus;
}
/** Admission requires write-level gateway authority even for a read-only workspace. */
export interface ConnectorExecuteMethod {
    readonly params: ConnectorExecutionSubmitParams;
    readonly result: ConnectorExecutionJob;
}
/** Original command result lookup admits no new effect. */
export interface ConnectorExecutionResultMethod {
    readonly params: ConnectorResultParams;
    readonly result: ConnectorExecutionJob;
}
/** An explicit stop captures the original command rather than selecting current lane contents. */
export interface ConnectorExecutionStopParams extends ConnectorEnvironmentParams {
    readonly jobId: string;
    readonly workspaceAccess: ConnectorExecutionAccess;
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly requestId: string;
    readonly admissionHash: string;
}
/** Stop admission contains no program arguments or output and does not by itself prove the command ended. */
export interface ConnectorExecutionStopReceipt extends ConnectorEnvironmentParams {
    readonly jobId: string;
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly requestId: string;
    readonly admissionHash: string;
    readonly phase: ConnectorJobPhase;
    readonly requestedAtMs: string | null;
}
/** Write-level gateway admission remains independent of reading a retained command result. */
export interface ConnectorExecutionStopMethod {
    readonly params: ConnectorExecutionStopParams;
    readonly result: ConnectorExecutionStopReceipt;
}
/** Latest original metadata has the retained workspace grant rather than the device's possibly newer profile. */
export interface ConnectorExecutionCurrentJob {
    readonly jobId: string;
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly requestId: string;
    readonly admissionHash: string;
    readonly programId: string;
    readonly rootId: string;
    readonly workspaceAccess: ConnectorExecutionAccess;
    readonly phase: ConnectorJobPhase;
}
/** One account snapshot correlates its permanent counter with the exact latest original. */
export interface ConnectorExecutionCurrentLane {
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly acknowledgedSequence: string;
    readonly job: ConnectorExecutionCurrentJob | null;
}
/** Current jobs contain no program arguments, output, host paths or credentials. */
export interface ConnectorExecutionCurrentJobs extends ConnectorEnvironmentParams {
    readonly lanes: readonly ConnectorExecutionCurrentLane[];
}
/** Read-only original selection supplies exact metadata for a later explicitly authorized stop. */
export interface ConnectorExecutionCurrentJobsMethod {
    readonly params: ConnectorEnvironmentParams;
    readonly result: ConnectorExecutionCurrentJobs;
}
