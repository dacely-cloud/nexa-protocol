// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Supported answer shapes for the initial owner question component. */
export const WorkflowAnswerType = { Text: 'text', Choice: 'choice', Boolean: 'boolean' };
/** Terminal outcomes never infer an answer from silence. */
export const WorkflowHumanOutcome = {
    Answered: 'answered',
    Expired: 'expired',
    Cancelled: 'cancelled',
    Approved: 'approved',
    Rejected: 'rejected',
    ChangesRequested: 'changes_requested',
};
/** Request presentation state also reflects whole-run cancellation. */
export const WorkflowHumanStatus = {
    Pending: 'pending',
    Answered: 'answered',
    Expired: 'expired',
    Cancelled: 'cancelled',
    Approved: 'approved',
    Rejected: 'rejected',
    ChangesRequested: 'changes_requested',
};
