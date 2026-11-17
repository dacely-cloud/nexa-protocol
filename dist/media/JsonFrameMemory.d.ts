/**
 * Bounds JSON allocation before parsing, including wire storage, UTF-16 text and two decoded copies.
 * Structural overhead covers containers, properties, array slots and scalar wrappers conservatively.
 * This byte preflight does not validate JSON grammar; the parser retains responsibility for that.
 */
export declare class JsonFrameMemory {
    #private;
    /** Measures only byte tokens; escaped quotes and structural characters inside strings are inert. */
    static measure(bytes: Uint8Array, limit: number): number;
}
