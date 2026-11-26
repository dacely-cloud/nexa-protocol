// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Pixel outcomes keep tolerated changes separate from exact equality. */
export const BrowserPixelStatus = {
    Identical: 'identical',
    WithinThreshold: 'within-threshold',
    Different: 'different',
    DimensionMismatch: 'dimension-mismatch',
};
