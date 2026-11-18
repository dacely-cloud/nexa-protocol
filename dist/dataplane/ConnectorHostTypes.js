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
};
/** Native paths and shell syntax belong to the customer computer, not the account API host. */
export const ConnectorHostPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    MacOs: 'macos',
};
/** Durable outcomes never treat uncertain effects as permission to execute a fresh original. */
export const ConnectorHostOutcome = {
    Succeeded: 'succeeded',
    Failed: 'failed',
    Indeterminate: 'indeterminate',
};
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
};
/** A queued original retains its identity across reconnects and account replicas. */
export const ConnectorHostJobPhase = {
    Queued: 'queued',
    Dispatched: 'dispatched',
    Completed: 'completed',
};
