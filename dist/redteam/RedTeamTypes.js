// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
export * from './RedTeamExecutionTypes.js';
/** Wire limits bound individual messages without bounding an effort's lifetime. */
export const RedTeamLimits = {
    defaultParallelism: 8,
    maxParallelism: 50,
    maxDelegatedAgents: 200,
    pageSize: 100,
    maxFiles: 100,
    rulesCharacters: 64_000,
};
/** Supported target selection mechanisms. */
export const RedTeamSourceKind = { GitHub: 'github', Files: 'files' };
/** Effort lifecycle states; completion of individual tasks does not stop an effort. */
export const RedTeamStatus = {
    Running: 'running',
    Stopping: 'stopping',
    Stopped: 'stopped',
    Failed: 'failed',
};
/** Worker scheduling and termination states. */
export const RedTeamAgentStatus = {
    Pending: 'pending',
    Running: 'running',
    Verifying: 'verifying',
    Idle: 'idle',
    Stopped: 'stopped',
    Failed: 'failed',
};
/** Ledger progress independent of the effort lifecycle. */
export const RedTeamTaskStatus = {
    Planned: 'planned',
    Running: 'running',
    Blocked: 'blocked',
    Completed: 'completed',
    Cancelled: 'cancelled',
};
/** Explicit verification outcome; pending candidates remain distinguishable. */
export const RedTeamFindingStatus = {
    Pending: 'pending',
    Confirmed: 'confirmed',
    Rejected: 'rejected',
};
/** Severity labels retained independently of the numerical CVSS score. */
export const RedTeamSeverity = {
    Critical: 'critical',
    High: 'high',
    Medium: 'medium',
    Low: 'low',
    Info: 'info',
};
/** Recorded work exchanges, without inferring relationships from model prose. */
export const RedTeamCoordinationKind = {
    Assign: 'assign',
    Result: 'result',
    Verify: 'verify',
    Progress: 'progress',
};
/** Typed red team operation names negotiated by the existing gateway handshake. */
export const RedTeamMethod = {
    Start: 'redteam.start',
    List: 'redteam.list',
    Get: 'redteam.get',
    Stop: 'redteam.stop',
    Update: 'redteam.update',
};
