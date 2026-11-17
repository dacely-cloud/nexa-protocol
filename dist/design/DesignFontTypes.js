// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Font containers are identified from validated bytes rather than a filename extension. */
export const DesignFontFormat = { Ttf: 'ttf', Otf: 'otf', Woff: 'woff', Woff2: 'woff2' };
/** Font libraries and transfers have independent, bounded storage budgets. */
export class DesignFontLimits {
    /** Each read returns at most one acknowledged binary slice. */
    static chunkBytes = 192 * 1024;
    /** One standalone font can occupy at most 16 MiB. */
    static fileBytes = 16n * 1024n * 1024n;
    /** All published fonts belonging to one owner share this ledger. */
    static ownerBytes = 64n * 1024n * 1024n;
    /** A library cannot accumulate an unbounded number of tiny records. */
    static ownerCount = 64;
}
