// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
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
};
