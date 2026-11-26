// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** The runtime selects a target adapter; callers may make the choice explicit for ambiguous files. */
export const ReverseTarget = {
    Native: 'native',
    JavaScript: 'javascript',
    Source: 'source',
    Network: 'network',
    Browser: 'browser',
} as const;

/** One reverse-engineering target kind. */
export type ReverseTarget = (typeof ReverseTarget)[keyof typeof ReverseTarget];

/** Runtime task lifecycle, distinct from the truth of model-authored findings. */
export const ReverseState = {
    Pending: 'pending',
    Running: 'running',
    Done: 'done',
    Failed: 'failed',
    Cancelled: 'cancelled',
    Partial: 'partial',
} as const;

/** Possible task and workflow states. */
export type ReverseState = (typeof ReverseState)[keyof typeof ReverseState];
