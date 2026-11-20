import type { ConnectorEnvironmentParams, ConnectorResultParams } from './ConnectorTypes.js';
import type { ExecutionLane } from 'nerva-connector-protocol/execution/ExecutionLane.js';
import type { ExecutionOutput } from 'nerva-connector-protocol/execution/ExecutionOutput.js';
import type { ConnectorFileJobPhase } from 'nerva-connector-protocol/protocol/ConnectorFileJobs.js';
/** Provisional output has original identity and phase, never an inferred successful exit. */
export interface ConnectorExecutionOutputView extends ConnectorEnvironmentParams {
    readonly id: string;
    readonly lane: ExecutionLane;
    readonly sequence: string;
    readonly admissionHash: string;
    readonly phase: ConnectorFileJobPhase;
    readonly output: ExecutionOutput | null;
}
/** Reading the captured original grants no command, stop or enrollment mutation. */
export interface ConnectorExecutionOutputMethod {
    readonly params: ConnectorResultParams;
    readonly result: ConnectorExecutionOutputView;
}
