// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Bounded JSON object validation protects parsing and structured tool dispatch on both sides of the relay. */
export class ConnectorHostJson {
    /** Accept only a finite UTF-8 JSON object; opaque JSON text remains the signed request representation. */
    static object(raw, maximumBytes) {
        if (typeof raw !== 'string' ||
            !raw.isWellFormed() ||
            raw.length > maximumBytes ||
            new TextEncoder().encode(raw).byteLength > maximumBytes) {
            throw new Error('Invalid host JSON byte bound');
        }
        const parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('Host JSON object required');
        }
        this.#walk(parsed, 0, { remaining: 32768 });
        return raw;
    }
    static #walk(raw, depth, budget) {
        budget.remaining--;
        if (depth > 32 || budget.remaining < 0) {
            throw new Error('Host JSON resource limit exceeded');
        }
        if (raw === null || typeof raw === 'string' || typeof raw === 'boolean') {
            return;
        }
        if (typeof raw === 'number' && Number.isFinite(raw)) {
            return;
        }
        if (Array.isArray(raw)) {
            for (const entry of raw) {
                this.#walk(entry, depth + 1, budget);
            }
            return;
        }
        if (typeof raw !== 'object' ||
            Object.getPrototypeOf(raw) !== Object.prototype ||
            Object.keys(raw).length > 256) {
            throw new Error('Invalid host JSON value');
        }
        for (const entry of Object.values(raw)) {
            this.#walk(entry, depth + 1, budget);
        }
    }
}
