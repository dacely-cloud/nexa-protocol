import type { DeliveredAttachment } from './DeliveredAttachment.js';
import type { BinaryDecodeAdmission } from './interface/BinaryDecodeAdmission.js';
/** Original bytes and metadata received together in one binary frame. */
export interface ReceivedAttachment extends DeliveredAttachment {
    readonly data: Uint8Array<ArrayBuffer>;
    readonly streamId?: string;
    readonly sessionId?: string;
}
/** Validated identity and content byte counts while an attachment is arriving. */
export interface AttachmentProgress {
    readonly id: string;
    readonly sessionId?: string;
    readonly streamId?: string;
    readonly receivedBytes: number;
    readonly totalBytes: number;
}
/** Platform-neutral NXMD binary attachment framing. */
export declare class BinaryMedia {
    #private;
    /** Reads only an available NXMD header; framing bytes do not count as file progress. */
    static progress(prefix: Uint8Array<ArrayBuffer>, total: number, admission?: BinaryDecodeAdmission): AttachmentProgress | null;
    static encode(attachment: DeliveredAttachment, bytes: Uint8Array, streamId?: string, sessionId?: string): Uint8Array<ArrayBuffer>;
    /** Streams saved pages or existing bytes without allocating another full attachment frame. */
    static stream(attachment: DeliveredAttachment, parts: AsyncIterable<Uint8Array> | Iterable<Uint8Array>, streamId?: string, sessionId?: string, chunkBytes?: number): AsyncGenerator<Uint8Array<ArrayBuffer>, void>;
    /** Validates metadata and exposes a view of the original bytes, without base64 conversion. */
    static decode(buffer: ArrayBuffer, maxBytes: number, admission?: BinaryDecodeAdmission): ReceivedAttachment;
}
