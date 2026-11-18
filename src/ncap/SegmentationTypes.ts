// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** One binary segmentation frame: its NCAP frame type and payload. */
export interface SegmentationFrame {
    readonly type: number;
    readonly payload: Uint8Array | readonly number[];
}
