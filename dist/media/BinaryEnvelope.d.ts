import type { BinaryJsonValue as JsonValue } from './interface/BinaryJsonValue.js';
import type { BinaryDecodeAdmission } from './interface/BinaryDecodeAdmission.js';
/** NXBF envelopes replace inline media and PCM strings with raw, contiguous bytes. */
export declare class BinaryEnvelope {
    /** Parses a JSON-facing message and projects admitted byte carriers into an NXBF frame. */
    static encode(text: string): Uint8Array<ArrayBuffer> | null;
    /** Extracts carriers before JSON serialization, so large files never create giant JSON frames. */
    static encodeValue(raw: unknown): Uint8Array<ArrayBuffer> | null;
    /** Encodes one disk upload chunk without converting its bytes to a string. */
    static encodeUploadChunk(requestId: string, uploadId: string, offset: string, bytes: Uint8Array): Uint8Array<ArrayBuffer>;
    /** Restores an admitted frame; optional allocation credit remains owned by its request. */
    static decode(buffer: ArrayBuffer | Uint8Array, maxBytes: number, maxJsonBytes?: number, admission?: BinaryDecodeAdmission): JsonValue;
}
