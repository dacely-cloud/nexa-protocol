// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Finite local storage accounting that can share an additional parent ceiling. */
export class BinaryByteBudget {
    #used = 0;
    #limit;
    #parent;
    /** Both ceilings must admit storage before an allocation or retained lifetime starts. */
    constructor(limit, parent) {
        if (!Number.isSafeInteger(limit) || limit <= 0) {
            throw new RangeError('Invalid byte budget');
        }
        this.#limit = limit;
        this.#parent = parent;
        if (new.target === BinaryByteBudget) {
            Object.freeze(this);
        }
    }
    /** Immutable ceiling; subclasses can add state without changing this counter's authority. */
    get limit() {
        return this.#limit;
    }
    /** Currently retained storage owned by this budget. */
    get used() {
        return this.#used;
    }
    /** Claims local and parent credit together, without queuing work. */
    reserve(bytes) {
        if (!Number.isSafeInteger(bytes) ||
            bytes < 0 ||
            bytes > this.#limit - this.#used ||
            (this.#parent !== undefined && !this.#parent.reserve(bytes))) {
            return false;
        }
        this.#used += bytes;
        return true;
    }
    /** Returns only storage this budget actually owns, including its parent's corresponding charge. */
    release(bytes) {
        if (!Number.isSafeInteger(bytes) || bytes < 0 || bytes > this.#used) {
            throw new RangeError('Invalid byte budget release');
        }
        this.#parent?.release(bytes);
        this.#used -= bytes;
    }
}
