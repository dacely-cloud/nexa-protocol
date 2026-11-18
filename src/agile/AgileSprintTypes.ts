// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Explicit sprint actions preserve a review boundary between completed work and the next increment. */
export const AgileSprintAction = {
    Start: 'start',
    Review: 'review',
    Complete: 'complete',
    Reopen: 'reopen',
} as const;

/** Supported lifecycle commands, shared by the model tool and authorized UI actions. */
export type AgileSprintAction = (typeof AgileSprintAction)[keyof typeof AgileSprintAction];

/** A version-bound edit cannot silently overwrite a newer model or user decision. */
export interface AgileSprintCommand {
    readonly id: string;
    readonly action: AgileSprintAction;
    readonly expectedVersion: number;
    readonly review?: string;
}
