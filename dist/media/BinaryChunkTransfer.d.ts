import type { BinaryChunkBudget } from './interface/BinaryChunkBudget.js';
import type { BinaryChunkReceipt } from './interface/BinaryChunkReceipt.js';
/** Owns one ordered transfer, allocating only received capacity and charging growth before copying. */
export declare class BinaryChunkTransfer {
    #private;
    readonly id: string;
    readonly total: number;
    /** The caller validates total and first payload against the wire limits before construction. */
    constructor(id: string, total: number, firstBytes: number, budget: BinaryChunkBudget, expired: () => void);
    /** Actual received prefix length, distinct from the peer's advertised total. */
    get offset(): number;
    /** Copies the next contiguous payload after reserving any required growth peak. */
    append(offset: number, payload: Uint8Array): void;
    /** Progress borrows this mutable prefix only until the callback returns. */
    prefix(): Uint8Array<ArrayBuffer>;
    /** Completion owns an exact-sized buffer; no final whole-transfer copy is necessary. */
    completed(): BinaryChunkReceipt;
    /** An idle timeout resets only after actual forward progress. */
    arm(): void;
    /** Idempotently returns buffer and receiver metadata credit on every terminal path. */
    close(): void;
}
