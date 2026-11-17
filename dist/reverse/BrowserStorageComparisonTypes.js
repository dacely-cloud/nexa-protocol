// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Matching observations prove equality only within their declared complete coverage. */
export const BrowserStorageCompareStatus = {
    Changed: 'changed',
    Unchanged: 'unchanged',
    Unknown: 'unknown',
};
/** Independent opt-ins determine whether content or only a name inventory can be compared. */
export const BrowserStorageCompareMode = {
    Fingerprints: 'fingerprints',
    Names: 'names',
    Unavailable: 'unavailable',
};
/** Absence becomes a change only when both inventories are complete. */
export const BrowserStorageChangeKind = {
    Added: 'added',
    Removed: 'removed',
    Modified: 'modified',
};
