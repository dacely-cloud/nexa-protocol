// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { BinaryAdmissionError } from './BinaryAdmissionError.js';
/** Holds admitted transfer storage until cancellation or an atomic handoff to its original budget. */
export class BinaryChunkCredit {
    #budget;
    #bytes;
    #closed = false;
    /** Claims credit before the receiver allocates initial storage. */
    constructor(budget, bytes) {
        if (!Number.isSafeInteger(bytes) || bytes < 0) {
            throw new RangeError('Invalid binary transfer credit');
        }
        if (!budget.reserve(bytes)) {
            throw new BinaryAdmissionError('Binary transfer memory budget is exhausted');
        }
        this.#budget = budget;
        this.#bytes = bytes;
        Object.freeze(this);
    }
    /** Held storage, including a growth peak until the old buffer is discarded. */
    get used() {
        return this.#bytes;
    }
    /** Ownership can be handed to a decoder only within its original or equivalent host budget. */
    belongsTo(budget) {
        return this.#budget === budget || this.#budget.matches?.(budget) === true;
    }
    /** Claims additional capacity before allocating or copying. */
    reserve(bytes) {
        if (this.#closed ||
            !Number.isSafeInteger(bytes) ||
            bytes < 0 ||
            bytes > Number.MAX_SAFE_INTEGER - this.#bytes ||
            !this.#budget.reserve(bytes)) {
            return false;
        }
        this.#bytes += bytes;
        return true;
    }
    /** Returns storage discarded during geometric growth. */
    release(bytes) {
        if (this.#closed || !Number.isSafeInteger(bytes) || bytes < 0 || bytes > this.#bytes) {
            throw new RangeError('Invalid binary transfer credit release');
        }
        this.#budget.release(bytes);
        this.#bytes -= bytes;
    }
    /** Moves existing credit once, resizing in place without returning live input storage. */
    transferTo(budget, limit, bytes) {
        if (this.#closed ||
            !this.belongsTo(budget) ||
            !Number.isSafeInteger(limit) ||
            limit <= 0 ||
            !Number.isSafeInteger(bytes) ||
            bytes < this.#bytes ||
            bytes > limit) {
            return false;
        }
        const growth = bytes - this.#bytes;
        if (growth > 0 && !this.#budget.reserve(growth)) {
            return false;
        }
        this.#closed = true;
        this.#bytes = 0;
        return true;
    }
    /** Idempotently releases a cancelled transfer or an unconsumed completed receipt. */
    close() {
        if (this.#closed) {
            return;
        }
        this.#closed = true;
        this.#budget.release(this.#bytes);
        this.#bytes = 0;
    }
}
