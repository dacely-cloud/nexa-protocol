// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Owns allocation credit shared by request and stream lifetimes referring to the same input. */
export class BinaryAllocationCredit {
    limit;
    #budget;
    #bytes;
    #owners = new Map();
    /** The initial lease's identity is created before any secondary owner can attach. */
    initialOwner = Symbol('gateway input credit');
    /** Private construction prevents a credit owner from existing without successful admission. */
    constructor(budget, limit, bytes) {
        this.limit = limit;
        this.#budget = budget;
        this.#bytes = bytes;
        this.#owners.set(this.initialOwner, bytes);
        Object.freeze(this);
    }
    /** Acquires initial working storage before any owner can retain or expand it. */
    static acquire(budget, limit, bytes) {
        if (!Number.isSafeInteger(limit) || limit <= 0) {
            throw new RangeError('Invalid reservation ceiling');
        }
        if (!Number.isSafeInteger(bytes) || bytes < 0 || bytes > limit || !budget.reserve(bytes)) {
            return null;
        }
        return BinaryAllocationCredit.#create(budget, limit, bytes);
    }
    /** Adopts already admitted reassembly storage without a free-credit gap or duplicate charge. */
    static adopt(budget, limit, bytes, input) {
        if (!Number.isSafeInteger(bytes) || bytes < 0) {
            return null;
        }
        const charged = Math.max(bytes, input.used);
        if (!input.transferTo(budget, limit, charged)) {
            return null;
        }
        return BinaryAllocationCredit.#create(budget, limit, charged);
    }
    /** Every construction failure returns the bytes whose successful admission preceded it. */
    static #create(budget, limit, bytes) {
        try {
            return new BinaryAllocationCredit(budget, limit, bytes);
        }
        catch (error) {
            budget.release(bytes);
            throw error;
        }
    }
    /** All allocation credit held until the final owner completes. */
    get used() {
        return this.#bytes;
    }
    /** Prevents a lease from another gateway budget from bypassing this gateway's admission. */
    belongsTo(budget) {
        return this.#budget === budget || this.#budget.matches?.(budget) === true;
    }
    /** Retains an existing allocation without counting its same input storage twice. */
    retain(minimumBytes) {
        if (this.#owners.size === 0 ||
            !Number.isSafeInteger(minimumBytes) ||
            minimumBytes < 0 ||
            minimumBytes > this.limit) {
            return null;
        }
        const growth = Math.max(0, minimumBytes - this.#bytes);
        if (!this.#budget.reserve(growth)) {
            return null;
        }
        const owner = Symbol('retained gateway input');
        this.#owners.set(owner, minimumBytes);
        this.#bytes += growth;
        return owner;
    }
    /** Grows storage only while a live owner and the shared budget both permit it. */
    reserve(owner, bytes) {
        if (!this.#owners.has(owner) ||
            !Number.isSafeInteger(bytes) ||
            bytes < 0 ||
            bytes > this.limit - this.#bytes ||
            !this.#budget.reserve(bytes)) {
            return false;
        }
        this.#bytes += bytes;
        this.#owners.set(owner, this.#bytes);
        return true;
    }
    /** Final release returns all bytes; individual leases enforce idempotent completion. */
    release(owner) {
        if (!this.#owners.delete(owner)) {
            throw new RangeError('Allocation credit has no such owner');
        }
        let needed = 0;
        let minimum;
        for (minimum of this.#owners.values()) {
            needed = Math.max(needed, minimum);
        }
        this.#budget.release(this.#bytes - needed);
        this.#bytes = needed;
    }
}
