/** Distinguishes denied allocation credit from malformed binary protocol data. */
export declare class BinaryAdmissionError extends RangeError {
    /** Allocation owners translate this failure to their backpressure policy and release credit. */
    constructor(message?: string);
}
