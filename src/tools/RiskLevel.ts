// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** How dangerous an action is. */
export const RiskLevel = {
    /** Reads only; no side effects. */
    Read: 'read',
    /** Writes inside the workspace. */
    Write: 'write',
    /** Runs code, or writes outside the workspace. */
    Execute: 'execute',
    /** Irreversible, or reaches outside this machine. */
    Destructive: 'destructive',
} as const;

/** A supported risk category derived from the shared runtime names. */
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];
