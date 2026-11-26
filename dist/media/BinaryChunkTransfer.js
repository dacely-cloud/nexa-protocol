// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { BinaryChunkCredit } from './BinaryChunkCredit.js';
import { BinaryAdmissionError } from './BinaryAdmissionError.js';
/** Owns one ordered transfer, allocating only received capacity and charging growth before copying. */
export class BinaryChunkTransfer {
    id;
    total;
    static #OVERHEAD = 512;
    static #EMPTY = new Uint8Array(0);
    #credit;
    #expired;
    #data;
    #offset = 0;
    #timer = null;
    #closed = false;
    /** The caller validates total and first payload against the wire limits before construction. */
    constructor(id, total, firstBytes, budget, expired) {
        this.id = id;
        this.total = total;
        if (!Number.isSafeInteger(total) ||
            total < 1 ||
            !Number.isSafeInteger(firstBytes) ||
            firstBytes < 1 ||
            firstBytes > total) {
            throw new RangeError('Invalid initial binary transfer bounds');
        }
        this.#expired = expired;
        const capacity = Math.min(total, Math.max(4096, firstBytes));
        const charge = capacity + BinaryChunkTransfer.#OVERHEAD;
        this.#credit = new BinaryChunkCredit(budget, charge);
        try {
            this.#data = new Uint8Array(capacity);
        }
        catch (error) {
            this.#credit.close();
            throw error;
        }
        Object.freeze(this);
    }
    /** Actual received prefix length, distinct from the peer's advertised total. */
    get offset() {
        return this.#offset;
    }
    /** Copies the next contiguous payload after reserving any required growth peak. */
    append(offset, payload) {
        if (this.#closed ||
            offset !== this.#offset ||
            payload.length < 1 ||
            payload.length > this.total - this.#offset) {
            throw new RangeError('Binary chunks are duplicated, interleaved or out of order');
        }
        const required = this.#offset + payload.length;
        if (required > this.#data.length) {
            const capacity = Math.min(this.total, Math.max(required, this.#data.length * 2));
            if (!this.#credit.reserve(capacity)) {
                throw new BinaryAdmissionError('Binary transfer growth exceeds its memory budget');
            }
            let grown;
            try {
                grown = new Uint8Array(capacity);
                grown.set(this.#data.subarray(0, this.#offset));
            }
            catch (error) {
                this.#credit.release(capacity);
                throw error;
            }
            const previous = this.#data.length;
            this.#data = grown;
            this.#credit.release(previous);
        }
        this.#data.set(payload, this.#offset);
        this.#offset = required;
    }
    /** Progress borrows this mutable prefix only until the callback returns. */
    prefix() {
        if (this.#closed) {
            throw new Error('Binary transfer is closed');
        }
        return this.#data.subarray(0, this.#offset);
    }
    /** Completion owns an exact-sized buffer; no final whole-transfer copy is necessary. */
    completed() {
        if (this.#closed || this.#offset !== this.total || this.#data.length !== this.total) {
            throw new Error('Binary transfer is incomplete');
        }
        const receipt = Object.freeze({
            buffer: this.#data.buffer,
            credit: this.#credit,
        });
        this.#closed = true;
        if (this.#timer !== null) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }
        this.#data = BinaryChunkTransfer.#EMPTY;
        return receipt;
    }
    /** An idle timeout resets only after actual forward progress. */
    arm() {
        if (this.#closed) {
            return;
        }
        if (this.#timer !== null) {
            clearTimeout(this.#timer);
        }
        this.#timer = setTimeout(this.#expired, 30000);
    }
    /** Idempotently returns buffer and receiver metadata credit on every terminal path. */
    close() {
        if (this.#closed) {
            return;
        }
        this.#closed = true;
        if (this.#timer !== null) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }
        this.#credit.close();
        this.#data = BinaryChunkTransfer.#EMPTY;
    }
}
