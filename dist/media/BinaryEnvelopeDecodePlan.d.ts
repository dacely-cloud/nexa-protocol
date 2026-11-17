import type { BinaryDecodeAdmission } from './interface/BinaryDecodeAdmission.js';
import type { BinaryDecodedCarrier } from './interface/BinaryDecodedCarrier.js';
import type { BinaryJsonValue } from './interface/BinaryJsonValue.js';
/** Validates every header, path, body range and expansion before allocating decoded carriers. */
export declare class BinaryEnvelopeDecodePlan {
    #private;
    /** Decoder-owned metadata; placeholders remain untouched until the complete plan is admitted. */
    readonly json: BinaryJsonValue;
    /** Immutable restoration instructions referring only to the owned metadata tree. */
    readonly carriers: readonly BinaryDecodedCarrier[];
    /** Borrows the frame only for synchronous validation; request admission owns allocated metadata. */
    constructor(frame: Uint8Array, maxJsonBytes: number, admission: BinaryDecodeAdmission | undefined);
}
