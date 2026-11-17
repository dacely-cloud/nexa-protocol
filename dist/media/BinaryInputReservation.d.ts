import { BinaryByteBudget } from './BinaryByteBudget.js';
import { BinaryChunkCredit } from './BinaryChunkCredit.js';
import type { BinaryDecodeAdmission } from './interface/BinaryDecodeAdmission.js';
/** Keeps one inbound allocation admitted from reassembly through decoding and consumer completion. */
export declare class BinaryInputReservation implements BinaryDecodeAdmission {
    #private;
    readonly limit: number;
    /** Construction follows successful admission and retains counters, never the payload buffer. */
    private constructor();
    /** Keeps completed credit live, growing only its existing charge instead of releasing/reacquiring it. */
    static acquire(budget: BinaryByteBudget, bytes: number, input?: BinaryChunkCredit): BinaryInputReservation;
    /** A queued consumer extends the existing input's lifetime without counting its storage twice. */
    retain(minimumBytes?: number): BinaryInputReservation;
    /** All storage still held by this input lifetime. */
    get used(): number;
    /** Decoder expansion is admitted before metadata, strings or arrays are allocated. */
    readonly reserve: (bytes: number) => boolean;
    /** Exactly-once release remains safe after disconnect and late asynchronous consumer settlement. */
    close(): void;
}
