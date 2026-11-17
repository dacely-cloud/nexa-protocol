import type { BinaryDecodeAdmission } from './interface/BinaryDecodeAdmission.js';
import type { BinaryJsonValue } from './interface/BinaryJsonValue.js';
/** Restores carriers only after the entire frame and decoded allocation plan are admitted. */
export declare class BinaryEnvelopeDecoder {
    #private;
    /** Borrows the exact input view for this synchronous operation, preserving offsets without a copy. */
    static decode(input: ArrayBuffer | Uint8Array, maxBytes: number, maxJsonBytes: number, admission: BinaryDecodeAdmission | undefined): BinaryJsonValue;
}
