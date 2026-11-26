// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Narrows parsed JSON with bounded nesting, without allocating another values array. */
export class BinaryJsonValidation {
    /** Accepts only finite JSON values; byte-view carriers are restored after validation. */
    static valid(value, depth = 0) {
        if (depth > 24) {
            return false;
        }
        if (value === null || typeof value === 'string' || typeof value === 'boolean') {
            return true;
        }
        if (typeof value === 'number') {
            return Number.isFinite(value);
        }
        if (Array.isArray(value)) {
            const entries = value;
            let entry;
            for (entry of entries) {
                if (!BinaryJsonValidation.valid(entry, depth + 1)) {
                    return false;
                }
            }
            return true;
        }
        if (!BinaryJsonValidation.record(value)) {
            return false;
        }
        let key;
        for (key in value) {
            if (Object.hasOwn(value, key) && !BinaryJsonValidation.valid(value[key], depth + 1)) {
                return false;
            }
        }
        return true;
    }
    /** Narrows a parsed record before any of its external fields are inspected. */
    static record(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
}
