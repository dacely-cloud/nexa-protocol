/** A full-host grant is separate from confined file/program policies and never inferred from pairing. */
export declare const ConnectorHostTool: {
    readonly ComputerInfo: 'computer_info';
    readonly EnvironmentInspect: 'environment_inspect';
    readonly FileRead: 'file_read';
    readonly FileDigest: 'file_digest';
    readonly FileWrite: 'file_write';
    readonly FileStat: 'file_stat';
    readonly FileRename: 'file_rename';
    readonly FilePublish: 'file_publish';
    readonly FileChmod: 'file_chmod';
    readonly DirectoryList: 'directory_list';
    readonly DirectoryCreate: 'directory_create';
    readonly FileRemove: 'file_remove';
    readonly ProcessStart: 'process_start';
    readonly ProcessRead: 'process_read';
    readonly ProcessWrite: 'process_write';
    readonly ProcessStop: 'process_stop';
    readonly ProcessRelease: 'process_release';
    readonly TerminalStart: 'terminal_start';
    readonly TerminalRead: 'terminal_read';
    readonly TerminalWrite: 'terminal_write';
    readonly TerminalResize: 'terminal_resize';
    readonly TerminalStop: 'terminal_stop';
    readonly TerminalRelease: 'terminal_release';
    readonly DesktopInfo: 'desktop_info';
    readonly ApplicationOpen: 'application_open';
    readonly DesktopSnapshot: 'desktop_snapshot';
    readonly DesktopScreenshot: 'desktop_screenshot';
    readonly DesktopPointer: 'desktop_pointer';
    readonly DesktopKey: 'desktop_key';
    readonly DesktopText: 'desktop_text';
    readonly NetworkResolve: 'network_resolve';
    readonly HttpOpen: 'http_open';
    readonly HttpRead: 'http_read';
    readonly HttpClose: 'http_close';
};
/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostTool = (typeof ConnectorHostTool)[keyof typeof ConnectorHostTool];
/** Native paths and shell syntax belong to the customer computer, not the account API host. */
export declare const ConnectorHostPlatform: {
    readonly Linux: 'linux';
    readonly Windows: 'windows';
    readonly MacOs: 'macos';
};
/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostPlatform = (typeof ConnectorHostPlatform)[keyof typeof ConnectorHostPlatform];
/** Durable outcomes never treat uncertain effects as permission to execute a fresh original. */
export declare const ConnectorHostOutcome: {
    readonly Succeeded: 'succeeded';
    readonly Failed: 'failed';
    readonly Indeterminate: 'indeterminate';
};
/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostOutcome = (typeof ConnectorHostOutcome)[keyof typeof ConnectorHostOutcome];
/** Finite native error semantics disclose no private OS messages or paths. */
export declare const ConnectorHostErrorCode: {
    readonly InvalidRequest: 'invalid-request';
    readonly NotFound: 'not-found';
    readonly AlreadyExists: 'already-exists';
    readonly NotDirectory: 'not-directory';
    readonly IsDirectory: 'is-directory';
    readonly PermissionDenied: 'permission-denied';
    readonly Unsupported: 'unsupported';
    readonly SnapshotChanged: 'snapshot-changed';
    readonly Canceled: 'canceled';
    readonly ResourceLimit: 'resource-limit';
    readonly OperationFailed: 'operation-failed';
    readonly Interrupted: 'interrupted';
    readonly AdmissionDenied: 'admission-denied';
    readonly CrossDevice: 'cross-device';
    /** The computer did not start it within 30 s of submission, so it never ran. */
    readonly Expired: 'expired';
};
/** Whether an effect occurred remains controlled by the separate terminal outcome. */
export type ConnectorHostErrorCode = (typeof ConnectorHostErrorCode)[keyof typeof ConnectorHostErrorCode];
/** A queued original retains its identity across reconnects and account replicas. */
export declare const ConnectorHostJobPhase: {
    readonly Queued: 'queued';
    readonly Dispatched: 'dispatched';
    readonly Completed: 'completed';
};
/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostJobPhase = (typeof ConnectorHostJobPhase)[keyof typeof ConnectorHostJobPhase];
/** Local consent and default task directory are signed under the enrolled device identity. */
export interface ConnectorHostProfile {
    readonly grantId: string;
    readonly grantRevision: string;
    readonly enabled: boolean;
    readonly platform: ConnectorHostPlatform;
    readonly directory: string;
    readonly tools: readonly ConnectorHostTool[];
}
/** Only exact bounded JSON text crosses the transport; the tool runtime validates its operation shape again. */
export interface ConnectorHostRequest {
    readonly grantId: string;
    readonly grantRevision: string;
    readonly toolName: ConnectorHostTool;
    readonly argumentsJson: string;
}
/** Successful JSON text contains exact decimal file/process quantities; failure text contains no private diagnostics. */
export interface ConnectorHostResponse {
    readonly outcome: ConnectorHostOutcome;
    readonly errorCode: ConnectorHostErrorCode | null;
    readonly resultJson: string | null;
}
/** Sequence counters remain permanent after bounded result compaction. */
export interface ConnectorHostStatus {
    readonly environmentId: string;
    readonly sequence: string;
    readonly acknowledgedSequence: string;
    readonly online: boolean;
    readonly profile: ConnectorHostProfile | null;
}
/** An account can poll only its original job in its own environment. */
export interface ConnectorHostJobView {
    readonly id: string;
    readonly environmentId: string;
    readonly sequence: string;
    readonly phase: ConnectorHostJobPhase;
    readonly request: ConnectorHostRequest;
    readonly response: ConnectorHostResponse | null;
}
/** Every submitted host operation pins the current permanent counter and complete locally approved grant. */
export interface ConnectorHostSubmitParams {
    readonly environmentId: string;
    readonly requestId: string;
    readonly previousSequence: string;
    readonly request: ConnectorHostRequest;
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
    readonly result: ConnectorHostStatus;
}
/** Admit an explicit complete original; pairing and confined roots do not grant host authority. */
export interface ConnectorHostSubmitMethod {
    readonly params: ConnectorHostSubmitParams;
    readonly result: ConnectorHostJobView;
}
/** Observe one original without submitting another effect. */
export interface ConnectorHostResultMethod {
    readonly params: ConnectorHostResultParams;
    readonly result: ConnectorHostJobView;
}
/** Inventory exposes consent/tool metadata without disclosing native private working directories. */
export interface ConnectorHostSummary {
    readonly grantId: string;
    readonly grantRevision: string;
    readonly enabled: boolean;
    readonly platform: ConnectorHostPlatform;
    readonly tools: readonly ConnectorHostTool[];
}
