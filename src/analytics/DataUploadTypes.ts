// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** A disk-backed upload; byte counts use decimal strings on the wire. */
export interface DataUpload {
    readonly id: string;
    readonly filename: string;
    readonly byteLength: string;
    /** Maximum binary chunk size supported by this upload host; absent on older gateways. */
    readonly chunkBytes?: string;
}

/** The durable position acknowledged after one bounded upload chunk. */
export interface DataUploadPosition {
    readonly id: string;
    readonly offset: string;
}

/** A complete source file the agent can process directly in its workspace. */
export interface DataFile extends DataUpload {
    readonly path: string;
}
