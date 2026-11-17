import type { BinaryChunkCredit } from '../BinaryChunkCredit.js';
/** Completed input keeps its transfer reservation until the consumer adopts or releases it. */
export interface BinaryChunkReceipt {
    readonly buffer: ArrayBuffer;
    readonly credit: BinaryChunkCredit | null;
}
