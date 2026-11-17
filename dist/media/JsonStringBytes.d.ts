/** Measures JSON string escaping and UTF-8 without first allocating an escaped or encoded string. */
export declare class JsonStringBytes {
    /** Returns at most limit + 1; saturation allows early rejection of oversized metadata. */
    static measure(value: string, limit: number): number;
}
