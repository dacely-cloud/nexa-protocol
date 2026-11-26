// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { JsonStringBytes } from './JsonStringBytes.js';
/** Sizes already validated JSON without allocating serialized text, byte buffers or key arrays. */
export class JsonSerializedBytes {
    limit;
    #bytes = 0;
    /** The caller's logical buffer ceiling bounds traversal as well as eventual storage. */
    constructor(limit) {
        this.limit = limit;
        if (!Number.isSafeInteger(limit) || limit < 1) {
            throw new RangeError('Invalid serialized JSON ceiling');
        }
        Object.freeze(this);
    }
    /** Reuses a bounded measurer for independently owned event values. */
    measure(value) {
        this.#bytes = 0;
        this.#visit(value, 0);
        return this.#bytes;
    }
    /** Depth and size checks stop cyclic or oversized inputs before another recursive visit. */
    #visit(value, depth) {
        if (depth > 64) {
            throw new RangeError('Serialized JSON nesting exceeds limits');
        }
        if (value === null || typeof value === 'boolean' || typeof value === 'number') {
            if (typeof value === 'number' && !Number.isFinite(value)) {
                throw new TypeError('Expected finite JSON number');
            }
            this.#take(String(value).length);
        }
        else if (typeof value === 'string') {
            this.#take(JsonStringBytes.measure(value, this.limit));
        }
        else if (JsonSerializedBytes.#array(value)) {
            this.#take(2);
            for (let index = 0; index < value.length; index += 1) {
                if (index > 0) {
                    this.#take(1);
                }
                this.#visit(value[index] ?? null, depth + 1);
            }
        }
        else if (value instanceof Uint8Array) {
            this.#take(2);
            for (let index = 0; index < value.length; index += 1) {
                const byte = value[index];
                if (byte === undefined) {
                    throw new TypeError('Changed JSON byte storage');
                }
                this.#take((index > 0 ? 1 : 0) + String(index).length + 3 + String(byte).length);
            }
        }
        else {
            this.#take(2);
            let count = 0;
            let key;
            for (key in value) {
                if (!Object.hasOwn(value, key)) {
                    continue;
                }
                const child = value[key];
                if (child === undefined) {
                    continue;
                }
                this.#take((count > 0 ? 1 : 0) + JsonStringBytes.measure(key, this.limit) + 1);
                count += 1;
                this.#visit(child, depth + 1);
            }
        }
    }
    /** Explicitly narrows readonly arrays, which the mutable built-in predicate does not exclude. */
    static #array(value) {
        return Array.isArray(value);
    }
    /** Refuses the first excessive component, keeping cumulative byte arithmetic within the ceiling. */
    #take(bytes) {
        if (bytes > this.limit - this.#bytes) {
            throw new RangeError('Serialized JSON exceeds limits');
        }
        this.#bytes += bytes;
    }
}
