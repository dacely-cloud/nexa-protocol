import type { BinaryChunkBudget } from './interface/BinaryChunkBudget.js';
import type { BinaryChunkCredit } from './BinaryChunkCredit.js';
/** Owns allocation credit shared by request and stream lifetimes referring to the same input. */
export declare class BinaryAllocationCredit {
    #private;
    readonly limit: number;
    /** The initial lease's identity is created before any secondary owner can attach. */
    readonly initialOwner: symbol;
    /** Private construction prevents a credit owner from existing without successful admission. */
    private constructor();
    /** Acquires initial working storage before any owner can retain or expand it. */
    static acquire(budget: BinaryChunkBudget, limit: number, bytes: number): BinaryAllocationCredit | null;
    /** Adopts already admitted reassembly storage without a free-credit gap or duplicate charge. */
    static adopt(budget: BinaryChunkBudget, limit: number, bytes: number, input: BinaryChunkCredit): BinaryAllocationCredit | null;
    /** All allocation credit held until the final owner completes. */
    get used(): number;
    /** Prevents a lease from another gateway budget from bypassing this gateway's admission. */
    belongsTo(budget: BinaryChunkBudget): boolean;
    /** Retains an existing allocation without counting its same input storage twice. */
    retain(minimumBytes: number): symbol | null;
    /** Grows storage only while a live owner and the shared budget both permit it. */
    reserve(owner: symbol, bytes: number): boolean;
    /** Final release returns all bytes; individual leases enforce idempotent completion. */
    release(owner: symbol): void;
}
