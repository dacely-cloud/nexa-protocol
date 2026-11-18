import type { ConnectorExecutionLane } from './ConnectorExecutionTypes.js';
import type { ConnectorEnvironmentParams, ConnectorJobPhase, ConnectorResultParams } from './ConnectorTypes.js';
/** Canonical base64 preserves at most 65536 combined application bytes. */
export interface ConnectorExecutionOutputData {
    readonly stdoutBase64: string;
    readonly stderrBase64: string;
}
/** Provisional output has original identity and phase, never an inferred successful exit. */
export interface ConnectorExecutionOutputView extends ConnectorEnvironmentParams {
    readonly id: string;
    readonly lane: ConnectorExecutionLane;
    readonly sequence: string;
    readonly admissionHash: string;
    readonly phase: ConnectorJobPhase;
    readonly output: ConnectorExecutionOutputData | null;
}
/** Reading the captured original grants no command, stop or enrollment mutation. */
export interface ConnectorExecutionOutputMethod {
    readonly params: ConnectorResultParams;
    readonly result: ConnectorExecutionOutputView;
}
