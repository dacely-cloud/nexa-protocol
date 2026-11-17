import type { BinaryChunkBudget } from './interface/BinaryChunkBudget.js';
import type { BinaryChunkReceipt } from './interface/BinaryChunkReceipt.js';
/** Ordered, bounded assembly of NXCH frames; JSON and PCM frames may pass between chunks. */
export declare class BinaryChunks {
    #private;
    readonly budget?: BinaryChunkBudget | undefined;
    static readonly MAX_FILE_BYTES: number;
    static readonly MAX_TRANSFER_BYTES: number;
    static readonly CHUNK_BYTES: number;
    /** Uses host accounting when supplied, otherwise a process-wide bounded receiver pool. */
    constructor(budget?: BinaryChunkBudget | undefined);
    /** Reads the signature directly from the logical view without copying its backing storage. */
    static isChunk(buffer: ArrayBuffer | Uint8Array): boolean;
    /** Produces small frames without duplicating the entire transfer. */
    static split(bytes: Uint8Array, chunkBytes?: number): Generator<Uint8Array<ArrayBuffer>, void>;
    /** Frames a known-length stream while retaining only one transport chunk and the current source page. */
    static stream(parts: AsyncIterable<Uint8Array> | Iterable<Uint8Array>, totalBytes: number, chunkBytes?: number): AsyncGenerator<Uint8Array<ArrayBuffer>, void>;
    /** Cancels the transfer identified by a previously sent chunk. */
    static cancel(chunk: Uint8Array): Uint8Array<ArrayBuffer>;
    /** Returns the complete frame, null while receiving, or the original unchunked frame. */
    accept(buffer: ArrayBuffer | Uint8Array, progress?: (prefix: Uint8Array<ArrayBuffer>, total: number) => void): ArrayBuffer | null;
    /** Keeps completed storage admitted until its consumer explicitly adopts or closes the credit. */
    acceptOwned(buffer: ArrayBuffer | Uint8Array, progress?: (prefix: Uint8Array<ArrayBuffer>, total: number) => void): BinaryChunkReceipt | null;
    /** Releases incomplete transfers on disconnect, cancellation, timeout or protocol failure. */
    clear(): void;
}
