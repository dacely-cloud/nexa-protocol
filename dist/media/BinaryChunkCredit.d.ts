import type { BinaryChunkBudget } from './interface/BinaryChunkBudget.js';
/** Holds admitted transfer storage until cancellation or an atomic handoff to its original budget. */
export declare class BinaryChunkCredit {
    #private;
    /** Claims credit before the receiver allocates initial storage. */
    constructor(budget: BinaryChunkBudget, bytes: number);
    /** Held storage, including a growth peak until the old buffer is discarded. */
    get used(): number;
    /** Ownership can be handed to a decoder only within its original or equivalent host budget. */
    belongsTo(budget: BinaryChunkBudget): boolean;
    /** Claims additional capacity before allocating or copying. */
    reserve(bytes: number): boolean;
    /** Returns storage discarded during geometric growth. */
    release(bytes: number): void;
    /** Moves existing credit once, resizing in place without returning live input storage. */
    transferTo(budget: BinaryChunkBudget, limit: number, bytes: number): boolean;
    /** Idempotently releases a cancelled transfer or an unconsumed completed receipt. */
    close(): void;
}
