// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** A full-host grant is separate from confined file/program policies and never inferred from pairing. */
export const ConnectorHostTool = {
    ComputerInfo: 'computer_info',
    EnvironmentInspect: 'environment_inspect',
    FileRead: 'file_read',
    FileDigest: 'file_digest',
    FileWrite: 'file_write',
    FileStat: 'file_stat',
    FileRename: 'file_rename',
    FilePublish: 'file_publish',
    FileChmod: 'file_chmod',
    DirectoryList: 'directory_list',
    DirectoryCreate: 'directory_create',
    FileRemove: 'file_remove',
    ProcessStart: 'process_start',
    ProcessRead: 'process_read',
    ProcessWrite: 'process_write',
    ProcessStop: 'process_stop',
    ProcessRelease: 'process_release',
    TerminalStart: 'terminal_start',
    TerminalRead: 'terminal_read',
    TerminalWrite: 'terminal_write',
    TerminalResize: 'terminal_resize',
    TerminalStop: 'terminal_stop',
    TerminalRelease: 'terminal_release',
    DesktopInfo: 'desktop_info',
    ApplicationOpen: 'application_open',
    DesktopSnapshot: 'desktop_snapshot',
    DesktopScreenshot: 'desktop_screenshot',
    DesktopPointer: 'desktop_pointer',
    DesktopKey: 'desktop_key',
    DesktopText: 'desktop_text',
    NetworkResolve: 'network_resolve',
    HttpOpen: 'http_open',
    HttpRead: 'http_read',
    HttpClose: 'http_close',
} as const;

/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostTool = (typeof ConnectorHostTool)[keyof typeof ConnectorHostTool];

/** Native paths and shell syntax belong to the customer computer, not the account API host. */
export const ConnectorHostPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    MacOs: 'macos',
} as const;

/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostPlatform =
    (typeof ConnectorHostPlatform)[keyof typeof ConnectorHostPlatform];

/** Durable outcomes never treat uncertain effects as permission to execute a fresh original. */
export const ConnectorHostOutcome = {
    Succeeded: 'succeeded',
    Failed: 'failed',
    Indeterminate: 'indeterminate',
} as const;

/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostOutcome = (typeof ConnectorHostOutcome)[keyof typeof ConnectorHostOutcome];

/** Finite native error semantics disclose no private OS messages or paths. */
export const ConnectorHostErrorCode = {
    InvalidRequest: 'invalid-request',
    NotFound: 'not-found',
    AlreadyExists: 'already-exists',
    NotDirectory: 'not-directory',
    IsDirectory: 'is-directory',
    PermissionDenied: 'permission-denied',
    Unsupported: 'unsupported',
    SnapshotChanged: 'snapshot-changed',
    Canceled: 'canceled',
    ResourceLimit: 'resource-limit',
    OperationFailed: 'operation-failed',
    Interrupted: 'interrupted',
    AdmissionDenied: 'admission-denied',
    CrossDevice: 'cross-device',
    /** The computer did not start it within 30 s of submission, so it never ran. */
    Expired: 'expired',
} as const;

/** Whether an effect occurred remains controlled by the separate terminal outcome. */
export type ConnectorHostErrorCode =
    (typeof ConnectorHostErrorCode)[keyof typeof ConnectorHostErrorCode];

/** A queued original retains its identity across reconnects and account replicas. */
export const ConnectorHostJobPhase = {
    Queued: 'queued',
    Dispatched: 'dispatched',
    Completed: 'completed',
} as const;

/** Allowed values derive from the current runtime mapping. */
export type ConnectorHostJobPhase =
    (typeof ConnectorHostJobPhase)[keyof typeof ConnectorHostJobPhase];

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
