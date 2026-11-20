import type { ConnectorHostJobView, ConnectorHostRequest, ConnectorHostStatus } from 'nerva-connector-protocol/protocol/ConnectorHost.js';
/** Every submitted host operation pins the current permanent counter and complete locally approved grant. */
export interface ConnectorHostSubmitParams {
    readonly environmentId: string;
    readonly requestId: string;
    readonly previousSequence: string;
    readonly request: ConnectorHostRequest<string>;
}
/** Status only selects an account-owned logical environment. */
export interface ConnectorHostStatusParams {
    readonly environmentId: string;
}
/** A result selects only an existing immutable host job. */
export interface ConnectorHostResultParams extends ConnectorHostStatusParams {
    readonly jobId: string;
}
/** Read current full-computer consent, native working directory and permanent counters. */
export interface ConnectorHostStatusMethod {
    readonly params: ConnectorHostStatusParams;
    readonly result: ConnectorHostStatus<string>;
}
/** Admit an explicit complete original; pairing and confined roots do not grant host authority. */
export interface ConnectorHostSubmitMethod {
    readonly params: ConnectorHostSubmitParams;
    readonly result: ConnectorHostJobView<string>;
}
/** Observe one original without submitting another effect. */
export interface ConnectorHostResultMethod {
    readonly params: ConnectorHostResultParams;
    readonly result: ConnectorHostJobView<string>;
}
