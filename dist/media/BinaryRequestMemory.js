// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { BinaryChunks } from './BinaryChunks.js';
import { BinaryEncoding } from './interface/BinaryEncoding.js';
/** Working-storage policy shared by binary admission and the default full-asset gateway budget. */
export class BinaryRequestMemory {
    static #WIRE_MULTIPLIER = 2;
    static #BASE64_MULTIPLIER = 8;
    static #ARRAY_MULTIPLIER = 32;
    /** One maximum base64 carrier, including wire views and decoded transport working storage. */
    static DEFAULT_REQUEST_BYTES = (BinaryRequestMemory.#WIRE_MULTIPLIER + BinaryRequestMemory.#BASE64_MULTIPLIER) *
        BinaryChunks.MAX_TRANSFER_BYTES;
    /** Charges backing storage rather than only the length of a potentially narrow view. */
    static wire(bytes) {
        return BinaryRequestMemory.#WIRE_MULTIPLIER * bytes.buffer.byteLength;
    }
    /** Covers decoded copies, serialized base64 storage, array growth and bounded fallback scratch. */
    static carrier(length, encoding, compact) {
        if (!Number.isSafeInteger(length) || length < 0) {
            throw new RangeError('Invalid binary carrier memory length');
        }
        if (encoding === BinaryEncoding.Array) {
            return BinaryRequestMemory.#ARRAY_MULTIPLIER * length + 256;
        }
        if (encoding === BinaryEncoding.Base64) {
            return (BinaryRequestMemory.#BASE64_MULTIPLIER * length + 8 * Math.min(length, 8190) + 1024);
        }
        return compact ? 2 * length + 256 : 256;
    }
}
