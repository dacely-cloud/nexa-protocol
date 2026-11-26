// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { Base64 } from './Base64.js';
import { BinaryChunks } from './BinaryChunks.js';
import { BinaryEncoding } from './interface/BinaryEncoding.js';
/** Validates carrier values without enumerating typed bytes or allocating decoded payloads. */
export class BinaryCarrierFactory {
    static #ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    /** Leaves noncanonical aliases in metadata so restoration preserves their exact original text. */
    static base64(value, path) {
        if (value.length > Math.ceil(BinaryChunks.MAX_FILE_BYTES / 3) * 4) {
            throw new RangeError('Binary envelope exceeds limits');
        }
        if (value.length % 4 !== 0 || !Base64.valid(value)) {
            return null;
        }
        const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
        const last = value[value.length - padding - 1];
        if (padding !== 0 &&
            (last === undefined ||
                (BinaryCarrierFactory.#ALPHABET.indexOf(last) & (padding === 2 ? 15 : 3)) !== 0)) {
            return null;
        }
        const length = (value.length / 4) * 3 - padding;
        BinaryCarrierFactory.#length(length);
        return {
            part: { path, length, encoding: BinaryEncoding.Base64 },
            mutateFrameBytes: (mutateDestination, offset) => {
                const target = mutateDestination.subarray(offset, offset + length);
                const native = target;
                if (typeof native.setFromBase64 === 'function') {
                    const result = native.setFromBase64(value);
                    if (result.read !== value.length || result.written !== length) {
                        throw new RangeError('Incomplete binary base64 carrier');
                    }
                    return;
                }
                let written = 0;
                for (let at = 0; at < value.length; at += 8192) {
                    const decoded = atob(value.slice(at, at + 8192));
                    for (let index = 0; index < decoded.length; index += 1) {
                        target[written++] = decoded.charCodeAt(index);
                    }
                }
            },
        };
    }
    /** Accepts byte views, byte arrays and dense indexed objects without an Object.values copy. */
    static array(value, path) {
        if (value instanceof Uint8Array) {
            BinaryCarrierFactory.#length(value.byteLength);
            return {
                part: { path, length: value.byteLength, encoding: BinaryEncoding.Array },
                mutateFrameBytes: (mutateDestination, offset) => {
                    mutateDestination.set(value, offset);
                },
            };
        }
        if (BinaryCarrierFactory.#numberArray(value)) {
            return {
                part: { path, length: value.length, encoding: BinaryEncoding.Array },
                mutateFrameBytes: (mutateDestination, offset) => {
                    mutateDestination.set(value, offset);
                },
            };
        }
        if (!BinaryCarrierFactory.#numberRecord(value)) {
            return null;
        }
        let length = 0;
        let key;
        for (key in value) {
            if (Object.hasOwn(value, key)) {
                length += 1;
            }
        }
        return {
            part: { path, length, encoding: BinaryEncoding.Array },
            mutateFrameBytes: (mutateDestination, offset) => {
                let index = 0;
                let field;
                for (field in value) {
                    if (!Object.hasOwn(value, field)) {
                        continue;
                    }
                    const byte = value[field];
                    if (byte === undefined) {
                        throw new TypeError('Missing indexed byte');
                    }
                    mutateDestination[offset + index++] = byte;
                }
            },
        };
    }
    /** Checks a byte count before any frame or decoded payload allocation. */
    static #length(length) {
        if (length > BinaryChunks.MAX_FILE_BYTES) {
            throw new RangeError('Binary envelope exceeds limits');
        }
    }
    /** Immediately narrows external array entries and refuses accessors without invoking them. */
    static #numberArray(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        BinaryCarrierFactory.#length(value.length);
        for (let index = 0; index < value.length; index += 1) {
            const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
            if (descriptor?.get !== undefined || descriptor?.set !== undefined) {
                throw new TypeError('Invalid binary JSON accessor');
            }
            const byte = descriptor?.value;
            if (typeof byte !== 'number' || !Number.isInteger(byte) || byte < 0 || byte > 255) {
                return false;
            }
        }
        return true;
    }
    /** Keeps only dense own indexed records; arbitrary object keys are never converted into arrays. */
    static #numberRecord(value) {
        if (value === null ||
            typeof value !== 'object' ||
            Array.isArray(value) ||
            (Reflect.getPrototypeOf(value) !== Object.prototype &&
                Reflect.getPrototypeOf(value) !== null)) {
            return false;
        }
        let count = 0;
        let key;
        for (key in value) {
            if (!Object.hasOwn(value, key)) {
                continue;
            }
            if (key !== String(count)) {
                return false;
            }
            count += 1;
            BinaryCarrierFactory.#length(count);
            const descriptor = Object.getOwnPropertyDescriptor(value, key);
            if (descriptor?.get !== undefined || descriptor?.set !== undefined) {
                throw new TypeError('Invalid binary JSON accessor');
            }
            const byte = descriptor?.value;
            if (typeof byte !== 'number' || !Number.isInteger(byte) || byte < 0 || byte > 255) {
                return false;
            }
        }
        return true;
    }
}
