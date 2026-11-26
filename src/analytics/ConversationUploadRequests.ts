// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { DataUploadContext } from './DataUploadTargetTypes.js';

/** Starts an upload without embedding source bytes in an agent request. */
export interface DataUploadStartParams {
    readonly context: DataUploadContext;
    readonly requestId: string;
    readonly filename: string;
    readonly byteLength: string;
}

/** One bounded base64 chunk with an exact byte offset. */
export interface DataUploadChunkParams {
    readonly id: string;
    readonly offset: string;
    readonly data: string;
}

/** Addresses an upload owned by the authenticated principal. */
export interface DataUploadIdParams {
    readonly id: string;
}
