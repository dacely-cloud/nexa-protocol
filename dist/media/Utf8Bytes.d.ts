/** Measures TextEncoder's UTF-8 length without allocating its output buffer. */
export declare class Utf8Bytes {
    #private;
    /** Saturates at limit + 1, including replacement bytes for unpaired UTF-16 surrogates. */
    static measure(value: string, limit: number): number;
}
