import type { BinaryJsonValue } from './interface/BinaryJsonValue.js';
/** Measures admitted JSON projections before any metadata copy, excluding their raw carriers. */
export declare class BinaryMetadataMeasure {
    #private;
    /** Takes an immutable set of replacement paths and the remaining header capacity. */
    constructor(paths: ReadonlySet<string>, limit: number);
    /** Performs exact sizing only when a binary frame is actually needed. */
    measure(value: BinaryJsonValue): number;
}
