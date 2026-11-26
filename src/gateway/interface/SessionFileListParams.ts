// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Indexed metadata paging inside one owned conversation. */
export interface SessionFileListParams {
    readonly id: string;
    /** @maxLength 73 */
    readonly cursor?: string;
    /**
     * @minimum 1
     * @maximum 128
     */
    readonly limit?: number;
}
