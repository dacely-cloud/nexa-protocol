/** Allocates one admitted NXBF frame and writes carriers into it without a temporary full payload. */
export declare class BinaryEnvelopeEncoder {
    /** Preserves plaintext fallback and the existing byte order, part order and JSON placeholders. */
    static encode(raw: unknown): Uint8Array<ArrayBuffer> | null;
}
