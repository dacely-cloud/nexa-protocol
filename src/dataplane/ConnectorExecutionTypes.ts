// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ConnectorEnvironmentParams, ConnectorResultParams } from './ConnectorTypes.js';
import type { ConnectorFileJobPhase } from 'nerva-connector-protocol/protocol/ConnectorFileJobs.js';
import type { ExecutionLane } from 'nerva-connector-protocol/execution/ExecutionLane.js';
import type {
    ExecutionResult,
    ExecutionWorkspaceAccess,
} from 'nerva-connector-protocol/execution/ExecutionTypes.js';
import type {
    ExecutionProfile,
    ExecutionRequest,
} from 'nerva-connector-protocol/execution/ExecutionJobs.js';
import type { ConnectorAuthorization } from 'nerva-connector-protocol/protocol/ConnectorAuthorization.js';

/** Current publication and permanent lane counters serve different purposes. */
export interface ConnectorExecutionLaneStatus {
    readonly lane: ExecutionLane;
    readonly sequence: string;
    readonly acknowledgedSequence: string;
    readonly online: boolean;
    readonly profile: ExecutionProfile<string> | null;
}

/** Status lists exactly first and second, without revealing device credentials or private paths. */
export interface ConnectorExecutionStatus extends ConnectorEnvironmentParams {
    readonly lanes: readonly ConnectorExecutionLaneStatus[];
}

/** Delegation intent is explicit; the API checks actual retained workspace access independently. */
export interface ConnectorExecutionSubmitParams extends ConnectorEnvironmentParams {
    readonly lane: ExecutionLane;
    readonly previousSequence: string;
    readonly workspaceAccess: ExecutionWorkspaceAccess;
    readonly request: ExecutionRequest;
}

/** Reads and retries preserve the same admitted original and selected command lane. */
export interface ConnectorExecutionJob extends ConnectorEnvironmentParams {
    readonly id: string;
    readonly lane: ExecutionLane;
    readonly sequence: string;
    readonly phase: ConnectorFileJobPhase;
    readonly request: ExecutionRequest;
    readonly authorization: ConnectorAuthorization<string>;
    readonly admissionHash: string;
    readonly response: ExecutionResult | null;
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
    readonly workspaceAccess: ExecutionWorkspaceAccess;
    readonly lane: ExecutionLane;
    readonly sequence: string;
    readonly requestId: string;
    readonly admissionHash: string;
}

/** Stop admission contains no program arguments or output and does not by itself prove the command ended. */
export interface ConnectorExecutionStopReceipt extends ConnectorEnvironmentParams {
    readonly jobId: string;
    readonly lane: ExecutionLane;
    readonly sequence: string;
    readonly requestId: string;
    readonly admissionHash: string;
    readonly phase: ConnectorFileJobPhase;
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
    readonly lane: ExecutionLane;
    readonly sequence: string;
    readonly requestId: string;
    readonly admissionHash: string;
    readonly programId: string;
    readonly rootId: string;
    readonly workspaceAccess: ExecutionWorkspaceAccess;
    readonly phase: ConnectorFileJobPhase;
}

/** One account snapshot correlates its permanent counter with the exact latest original. */
export interface ConnectorExecutionCurrentLane {
    readonly lane: ExecutionLane;
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
