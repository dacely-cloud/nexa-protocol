// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** A session-owned archive, without query tokens or analyzer handles. */
export interface ReverseArchiveRef {
    readonly sessionId: string;
}
