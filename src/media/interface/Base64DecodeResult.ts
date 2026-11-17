// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Byte counts returned by the optional native base64 writer. */
export interface Base64DecodeResult {
    /** Number of input characters consumed. */
    readonly read: number;
    /** Number of bytes stored in the destination. */
    readonly written: number;
}
