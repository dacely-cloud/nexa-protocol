// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Intentional SVG file transfer and parsing remain bounded independently of canvas scrolling. */
export class DesignSvgImportLimits {
    static bytes = 2n * 1024n * 1024n;
    static characters = 2 * 1024 * 1024;
}
