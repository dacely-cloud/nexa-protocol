// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * Bounds JSON allocation before parsing, including wire storage, UTF-16 text and two decoded copies.
 * Structural overhead covers containers, properties, array slots and scalar wrappers conservatively.
 * This byte preflight does not validate JSON grammar; the parser retains responsibility for that.
 */
export class JsonFrameMemory {
    static #MAX_DEPTH = 64;
    static #NODE_BYTES = 128;
    static #WIRE_MULTIPLIER = 7;
    /** Measures only byte tokens; escaped quotes and structural characters inside strings are inert. */
    static measure(bytes, limit) {
        if (!Number.isSafeInteger(limit) || limit <= 0) {
            throw new RangeError('Invalid JSON memory ceiling');
        }
        const length = bytes.byteLength;
        let charge = length * JsonFrameMemory.#WIRE_MULTIPLIER + JsonFrameMemory.#NODE_BYTES;
        if (charge > limit) {
            throw new RangeError('JSON request memory exceeds the gateway input budget');
        }
        let quoted = false;
        let escaped = false;
        let scalar = false;
        let depth = 0;
        for (let index = 0; index < length; index += 1) {
            const byte = bytes[index];
            if (byte === undefined) {
                throw new RangeError('JSON input storage changed during memory admission');
            }
            if (quoted) {
                if (escaped) {
                    escaped = false;
                }
                else if (byte === 0x5c) {
                    escaped = true;
                }
                else if (byte === 0x22) {
                    quoted = false;
                }
                continue;
            }
            if (byte === 0x22) {
                quoted = true;
                scalar = false;
                charge += JsonFrameMemory.#NODE_BYTES;
            }
            else if (byte === 0x7b || byte === 0x5b) {
                depth += 1;
                if (depth > JsonFrameMemory.#MAX_DEPTH) {
                    throw new RangeError('JSON request nesting exceeds the gateway input limit');
                }
                scalar = false;
                charge += JsonFrameMemory.#NODE_BYTES;
            }
            else if (byte === 0x7d || byte === 0x5d) {
                depth = Math.max(0, depth - 1);
                scalar = false;
            }
            else if (byte === 0x2c || byte === 0x3a || byte <= 0x20) {
                scalar = false;
            }
            else if (!scalar) {
                scalar = true;
                charge += JsonFrameMemory.#NODE_BYTES;
            }
            if (charge > limit) {
                throw new RangeError('JSON request memory exceeds the gateway input budget');
            }
        }
        return charge;
    }
}
