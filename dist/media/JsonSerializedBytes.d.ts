import type { JsonSerializedValue } from './interface/JsonSerializedValue.js';
/** Sizes already validated JSON without allocating serialized text, byte buffers or key arrays. */
export declare class JsonSerializedBytes {
    #private;
    readonly limit: number;
    /** The caller's logical buffer ceiling bounds traversal as well as eventual storage. */
    constructor(limit: number);
    /** Reuses a bounded measurer for independently owned event values. */
    measure(value: JsonSerializedValue): number;
}
