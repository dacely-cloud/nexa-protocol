import { BinaryEncoding } from './interface/BinaryEncoding.js';
/** Working-storage policy shared by binary admission and the default full-asset gateway budget. */
export declare class BinaryRequestMemory {
    #private;
    /** One maximum base64 carrier, including wire views and decoded transport working storage. */
    static readonly DEFAULT_REQUEST_BYTES: number;
    /** Charges backing storage rather than only the length of a potentially narrow view. */
    static wire(bytes: Uint8Array): number;
    /** Covers decoded copies, serialized base64 storage, array growth and bounded fallback scratch. */
    static carrier(length: number, encoding: BinaryEncoding, compact: boolean): number;
}
