// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
import { BinaryByteBudget } from './BinaryByteBudget.js';
import { BinaryChunkCredit } from './BinaryChunkCredit.js';
import { BinaryAdmissionError } from './BinaryAdmissionError.js';
import { BinaryAllocationCredit } from './BinaryAllocationCredit.js';
/** Keeps one inbound allocation admitted from reassembly through decoding and consumer completion. */
export class BinaryInputReservation {
    limit;
    #credit;
    #owner;
    #closed = false;
    /** Construction follows successful admission and retains counters, never the payload buffer. */
    constructor(credit, owner, limit) {
        this.limit = limit;
        this.#credit = credit;
        this.#owner = owner;
        Object.freeze(this);
    }
    /** Keeps completed credit live, growing only its existing charge instead of releasing/reacquiring it. */
    static acquire(budget, bytes, input) {
        if (input !== undefined && !input.belongsTo(budget)) {
            throw new RangeError('Foreign inbound allocation owner');
        }
        const credit = input === undefined
            ? BinaryAllocationCredit.acquire(budget, budget.limit, bytes)
            : BinaryAllocationCredit.adopt(budget, budget.limit, bytes, input);
        if (credit === null) {
            throw new BinaryAdmissionError();
        }
        return BinaryInputReservation.#create(credit, credit.initialOwner);
    }
    /** A queued consumer extends the existing input's lifetime without counting its storage twice. */
    retain(minimumBytes = this.used) {
        if (this.#closed) {
            throw new RangeError('Inbound input owner is closed');
        }
        const owner = this.#credit.retain(minimumBytes);
        if (owner === null) {
            throw new BinaryAdmissionError();
        }
        return BinaryInputReservation.#create(this.#credit, owner);
    }
    /** Failed wrapper construction returns only the owner it just acquired. */
    static #create(credit, owner) {
        try {
            return new BinaryInputReservation(credit, owner, credit.limit);
        }
        catch (error) {
            credit.release(owner);
            throw error;
        }
    }
    /** All storage still held by this input lifetime. */
    get used() {
        return this.#closed ? 0 : this.#credit.used;
    }
    /** Decoder expansion is admitted before metadata, strings or arrays are allocated. */
    reserve = (bytes) => !this.#closed &&
        Number.isSafeInteger(bytes) &&
        bytes >= 0 &&
        bytes <= this.limit - this.#credit.used &&
        this.#credit.reserve(this.#owner, bytes);
    /** Exactly-once release remains safe after disconnect and late asynchronous consumer settlement. */
    close() {
        if (this.#closed) {
            return;
        }
        this.#closed = true;
        this.#credit.release(this.#owner);
    }
}
