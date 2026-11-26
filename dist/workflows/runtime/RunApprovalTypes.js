// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Explicit decisions; absence of a decision never grants permission. */
export const WorkflowApprovalChoice = {
    Approve: 'approved',
    Reject: 'rejected',
    RequestChanges: 'changes_requested',
    Cancel: 'cancelled',
};
