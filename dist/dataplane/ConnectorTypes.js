// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Enrollment state is separate from a current authenticated transport or file grant. */
export const ConnectorPhase = {
    Pending: 'pending',
    EnrolledOffline: 'enrolled-offline',
    Revoked: 'revoked',
};
/** Finite file operations retain separate read and mutation authorization. */
export const ConnectorFileAction = {
    Read: 'read',
    Stat: 'stat',
    List: 'list',
    Write: 'write',
    Remove: 'remove',
    Mkdir: 'mkdir',
    Chmod: 'chmod',
    Rename: 'rename',
};
/** Permission changes never add access for another OS user or set special bits. */
export const ConnectorFilePermissionMode = {
    Private: 0o600,
    Executable: 0o700,
};
/** Atomic publication choices never grant append, removal or program execution. */
export const ConnectorWriteMode = {
    Create: 'create',
    Replace: 'replace',
};
/** Listed links and special files carry no authority to follow or execute them. */
export const ConnectorFileKind = {
    File: 'file',
    Directory: 'directory',
    SymbolicLink: 'symbolic-link',
    Other: 'other',
};
/** No backend or native error text is forwarded as file diagnostics. */
export const ConnectorFileFailure = {
    Invalid: 'invalid',
    Denied: 'denied',
    Unavailable: 'unavailable',
    Changed: 'changed',
    Indeterminate: 'indeterminate',
};
/** Shared dispatch state is independent of the Nexa process handling the request. */
export var ConnectorJobPhase;
(function (ConnectorJobPhase) {
    ConnectorJobPhase["Queued"] = "queued";
    ConnectorJobPhase["Dispatched"] = "dispatched";
    ConnectorJobPhase["Completed"] = "completed";
})(ConnectorJobPhase || (ConnectorJobPhase = {}));
