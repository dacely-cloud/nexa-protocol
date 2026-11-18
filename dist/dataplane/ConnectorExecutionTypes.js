// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Fixed command lanes retain separate original dispatch and compaction history. */
export var ConnectorExecutionLane;
(function (ConnectorExecutionLane) {
    ConnectorExecutionLane["First"] = "first";
    ConnectorExecutionLane["Second"] = "second";
})(ConnectorExecutionLane || (ConnectorExecutionLane = {}));
/** Local workspace mutation and cloud write delegation must both permit an operation. */
export var ConnectorExecutionAccess;
(function (ConnectorExecutionAccess) {
    ConnectorExecutionAccess["ReadOnly"] = "read-only";
    ConnectorExecutionAccess["ReadWrite"] = "read-write";
})(ConnectorExecutionAccess || (ConnectorExecutionAccess = {}));
/** Transport loss and uncertain commands must never be presented as successful exits. */
export var ConnectorExecutionTermination;
(function (ConnectorExecutionTermination) {
    ConnectorExecutionTermination["Exited"] = "exited";
    ConnectorExecutionTermination["Indeterminate"] = "indeterminate";
})(ConnectorExecutionTermination || (ConnectorExecutionTermination = {}));
/** A failure describes observation, not proof that no effect occurred. */
export const ConnectorExecutionFailure = {
    Sandbox: 'sandbox',
    Cancelled: 'cancelled',
    Timeout: 'timeout',
    OutputLimit: 'output-limit',
    Signal: 'signal',
    AmbiguousExit: 'ambiguous-exit',
    Interrupted: 'interrupted',
    Expired: 'expired',
};
/** Setup stages contain no raw OS diagnostic or host path. */
export const ConnectorExecutionSetupFailure = {
    Bootstrap: 'bootstrap',
    Configuration: 'configuration',
    Namespaces: 'namespaces',
    Cgroup: 'cgroup',
    Mounts: 'mounts',
    AppArmor: 'apparmor',
    Confinement: 'confinement',
    Execute: 'execute',
};
