// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Observed engine operations, independent of presentation timing. */
export const RedTeamActionKind = {
    Read: 'read',
    Tool: 'tool',
    Edit: 'edit',
    Wait: 'wait',
    Delegate: 'delegate',
    Result: 'result',
    Verify: 'verify',
    Error: 'error',
};
/** Authoritative action lifecycle, including unsuccessful and cancelled operations. */
export const RedTeamActionState = {
    Started: 'started',
    Progress: 'progress',
    Succeeded: 'succeeded',
    Failed: 'failed',
    Cancelled: 'cancelled',
    Unconfirmed: 'unconfirmed',
    Waiting: 'waiting',
};
/** Content remains a dot; its original session supplies its inspectable details. */
export const RedTeamTargetKind = {
    File: 'file',
    Tool: 'tool',
    Terminal: 'terminal',
    Task: 'task',
    Result: 'result',
    Finding: 'finding',
    Plan: 'plan',
};
