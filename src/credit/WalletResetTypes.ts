// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** JSON-safe reset state; generation tokens prevent stale tabs consuming another entitlement. */
export interface ResetSnapshot {
    readonly userId: string;
    readonly asOf: number;
    readonly week: string;
    readonly cycle: string;
    readonly available: string;
}

/** Owner-scoped reset evidence without operator grant/payment identifiers. */
export interface ResetHistoryEntry {
    readonly sequence: string;
    readonly week: string;
    readonly allowance: string;
    readonly previousUsed: string;
    readonly previousHeld: string;
    readonly recordedAt: number;
}

/** Stable descending pagination. */
export interface ResetHistoryPage {
    readonly userId: string;
    readonly entries: readonly ResetHistoryEntry[];
    readonly next: string | null;
}

/** A confirmed reset always applies to the exact displayed allowance generation. */
export interface ResetAllowanceParams {
    readonly requestId: string;
    readonly week: string;
    readonly cycle: string;
}

/** A successful mutation carries its immutable receipt, including on retries. */
export interface ResetAllowanceResult {
    readonly userId: string;
    readonly requestId: string;
    readonly receipt: ResetHistoryEntry;
}
